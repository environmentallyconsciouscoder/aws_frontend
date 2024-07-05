import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Forms from "./targets-forms"
// import { WeeklyWasteTrendContext } from "../../../../contexts/weekly-trends-context";
import useWindowDimensions from "../../libs/use-window-dimensions";

let setWidth = "50%"

const useStyles = makeStyles(theme => ({
  root: {
    width: setWidth,
    fontSize: "10"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

export default function HorizontalLinearStepper(props) {
  // console.log("props",props);

  const { width } = useWindowDimensions();

  if (width <= 700) {
    setWidth = "100%"
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    "What sector do you work in",
    // "What is your savings target for food waste"
  ];

  const handleChange = (event) => {
    const { value, name} = event.target;
    props.handleChange(name, value)
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
      //   return "Find out the savings tailored to your sector by selecting from the list?";
      // case 1:
        return "Find out how much you could save by setting a target - the results will show you £ and carbon savings";
      default:
        return "Unknown step";
    }
  }


  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    props.checkActiveStep(activeStep)
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    props.checkActiveStep(activeStep)
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div>
        {activeStep === steps.length ? (
          <div className="completedForm">
            <Typography className={classes.instructions}>
              <div className="target__calculatorResults--styling">
                <div>Please see results below</div>
              </div>
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div style={{
                paddingTop: "3rem"
          }}>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Forms
              steps={activeStep}
              handleChange={handleChange}
              poundsKGconverter={props.poundsKGconverter}
              savingPercentage={props.savingPercentage}/>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "SAVE" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
