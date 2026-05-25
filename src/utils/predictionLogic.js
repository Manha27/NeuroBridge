export const predictRisk = (mmse, cdr) => {
  if (mmse >= 26 && cdr <= 0.5) {
    return {
      level: "Low Risk",
      color: "green",
      recommendation: "Routine monthly monitoring recommended.",
    };
  }

  if (mmse >= 20 && mmse < 26) {
    return {
      level: "Moderate Risk",
      color: "yellow",
      recommendation:
        "Weekly cognitive monitoring and memory exercises recommended.",
    };
  }

  return {
    level: "High Risk",
    color: "red",
    recommendation: "Daily supervision and caregiver intervention required.",
  };
};

export const getMonitoringFrequency = (age, cdr) => {
  if (age >= 80 || cdr >= 2) {
    return "Daily";
  }

  if (age >= 70 || cdr >= 1) {
    return "Weekly";
  }

  return "Monthly";
};

export const getSupportLevel = (cluster) => {
  switch (cluster) {
    case "High Support":
      return {
        level: "High Support",
        description:
          "Patient requires intensive monitoring and caregiver support.",
      };

    case "Moderate Support":
      return {
        level: "Moderate Support",
        description: "Patient requires regular cognitive supervision.",
      };

    default:
      return {
        level: "Low Support",
        description: "Patient condition is comparatively stable.",
      };
  }
};

export const getVulnerabilityFlag = (ses, cdr) => {
  if (ses >= 4 && cdr >= 1) {
    return "Extra social and caregiver support recommended.";
  }

  return "No major social vulnerability detected.";
};

export const getExerciseRecommendation = (educ, mmse) => {
  if (educ <= 10 || mmse <= 20) {
    return [
      "Simple memory recall tasks",
      "Orientation exercises",
      "Daily reminder activities",
    ];
  }

  return [
    "Puzzle-solving activities",
    "Problem-solving exercises",
    "Advanced memory games",
  ];
};
