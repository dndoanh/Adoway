using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Adoway.BackEnd.Configs;
using Adoway.Data.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Adoway.Data.Repositories.UserManagement;
using Adoway.Service.UserManagement;
using Adoway.BackEnd.Controllers.Filters;
using Adoway.Common.Helpers;
using Adoway.BackEnd.Controllers.LiveHub;

namespace Adoway.BackEnd
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // register cors
            services.AddCors();
            // register controllers
            services.AddControllers()
                .AddNewtonsoftJson()
                .AddJsonOptions(x => x.JsonSerializerOptions.IgnoreNullValues = true);
            // register automapper
            services.AddAutoMapper(typeof(MappingProfile));
            // register api key filter
            services.AddMvcCore(options =>
            {
                options.Filters.Add<ApiKeyFilter>();
            });
            // register JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero //the default for this setting is 5 minutes
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    },
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        // If the request is for our hub...
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.StartsWithSegments("/live")))
                        {
                            // Read the token out of the query string
                            if (!accessToken.Contains("Bearer"))
                                accessToken = $"Bearer {accessToken}";
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            // register db context
            services.AddDbContext<AdowayContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("EccConnection")));
            services.AddScoped<IAdowayContext>(provider => provider.GetService<AdowayContext>());

            // register repositories
            services.Scan(scan => scan
              .FromAssemblyOf<IUserRepository>()
              .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Repository")))
              .AsMatchingInterface()
              .WithTransientLifetime());

            // register services
            services.Scan(scan => scan
              .FromAssemblyOf<IUserService>()
              .AddClasses(classes => classes.Where(type => type.Name.EndsWith("Service")))
              .AsMatchingInterface()
              .WithTransientLifetime());

            // register signalr
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // config static files
            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            // global cors policy
            app.UseCors(x => x
                .SetIsOriginAllowed(origin => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<LiveHub>("/live");
            });
        }
    }
}
