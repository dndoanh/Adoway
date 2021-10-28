import React from "react";
import { Route } from "react-router-dom";
import { ContractsLoadingDialog } from "./contracts-loading-dialog/ContractsLoadingDialog";
import { ContractEditDialog } from "./contract-edit-dialog/ContractEditDialog";
import { ContractDeleteDialog } from "./contract-delete-dialog/ContractDeleteDialog";
import { ContractsUIProvider } from "./ContractsUIContext";
import { ContractsCard } from "./ContractsCard";

export function ContractsPage({ history }) {
    const contractsUIEvents = {
        newContractButtonClick: () => {
            history.push("/contracts/new");
        },
        newContractInRolesButtonClick: () => {
            history.push("/contracts/new-contract-in-roles");
        },
        openEditContractDialog: (id) => {
            history.push(`/contracts/${id}/edit`);
        },
        openEditContractInRoleDialog: (id) => {
            history.push(`/contracts/${id}/edit-role`);
        },
        openDeleteContractDialog: (id) => {
            history.push(`/contracts/${id}/delete`);
        },
        openDeleteContractInRolesDialog: (id) => {
            history.push(`/contracts/${id}/delete-contract-in-roles`);
        }
    }

    return (
        <ContractsUIProvider contractsUIEvents={contractsUIEvents}>
            <ContractsLoadingDialog />
            <Route path="/contracts/new">
                {({ history, match }) => (
                    <ContractEditDialog
                        show={match != null}
                        onHide={() => {
                            history.push("/contracts");
                        }}
                    />
                )}
            </Route>
            <Route path="/contracts/:id/edit">
                {({ history, match }) => (
                    <ContractEditDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/contracts");
                        }}
                    />
                )}
            </Route>
            <Route path="/contracts/:id/delete">
                {({ history, match }) => (
                    <ContractDeleteDialog
                        show={match != null}
                        id={match && match.params.id}
                        onHide={() => {
                            history.push("/contracts");
                        }}
                    />
                )}
            </Route>
            <ContractsCard />
        </ContractsUIProvider>
    );
}
