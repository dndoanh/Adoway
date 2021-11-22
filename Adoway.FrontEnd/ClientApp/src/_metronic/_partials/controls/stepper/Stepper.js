import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useField } from "formik";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Choose State','Draft', 'Confirmed', 'Verified', 'Approved', 'Paying','Done'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Choose State';
        case 1:
            return 'Draft';
        case 2:
            return 'Confirmed';
        case 3:
            return 'Verified';
        case 4:
            return 'Approved';
        case 5:
            return 'Paying';
        case 6:
            return 'Done';
        default:
            return 'Unknown step';
    }
}

export function HorizontalNonLinearStepper({ name, options, value, label }) {
    const classes = useStyles();
    //const [field, meta] = useField(props);
    //const { touched, error } = meta;
    const [activeStep, setActiveStep] = React.useState(value || 1);
    const [completed, setCompleted] = React.useState({});

    const [field, state, { setValue, setTouched }] = useField(name);
    React.useEffect(() => {
        debugger;
        setValue(state?.value);
    }, []);

    const steps = getSteps();
    debugger;

    function totalSteps() {
        return steps.length;
    }

    function completedSteps() {
        return Object.keys(completed).length;
    }

    function isLastStep() {
        return activeStep === totalSteps() - 1;
    }

    function allStepsCompleted() {
        return completedSteps() === totalSteps();
    }
    function handleNext() {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
        setValue(newActiveStep)
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    const handleStep = step => () => {
        setValue(step);
        setActiveStep(step);
    };

    function handleComplete() {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    }

    function handleReset() {
        setActiveStep(1);
        setCompleted({});
    }

    return (
        <div className={classes.root}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                    {activeStep !== steps.length && getSteps()[activeStep+1]}
                            </Button>
                            {/*{activeStep !== steps.length &&*/}
                            {/*    (completed[activeStep] ? (*/}
                            {/*        <Typography variant="caption" className={classes.completed}>*/}
                            {/*            Step {activeStep + 1} already completed*/}
                            {/*        </Typography>*/}
                            {/*    ) : (*/}
                            {/*        <Button variant="contained" color="primary" onClick={handleComplete}>*/}
                            {/*            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}*/}
                            {/*        </Button>*/}
                            {/*    ))}*/}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}