import axios from "axios";
export const registerMedicalForm = newMedicalForm => {
    return axios
      .post("AddMedical/", {
        partyID:newMedicalForm.partyID,
        date: newMedicalForm.date,
        pathologies: newMedicalForm.pathologies,
        allergies: newMedicalForm.allergies,
        surgerie: newMedicalForm.surgerie,
        traumas: newMedicalForm.traumas,
        smoking: newMedicalForm.smoking,
        neurologicalInfo: newMedicalForm.neurologicalInfo,
        pulmonaryCardioInfo: newMedicalForm.pulmonaryCardioInfo,
        bloodPressure: newMedicalForm.bloodPressure,
        heartRate: newMedicalForm.heartRate,
        heartRatePerMinute : newMedicalForm.heartRatePerMinute,
        Sp02: newMedicalForm.Sp02,
        weight: newMedicalForm.weight,
        size: newMedicalForm.size,
        IMC : newMedicalForm.IMC,
        abdomen: newMedicalForm.abdomen,
        waist: newMedicalForm.waist,
        hip: newMedicalForm.hip,
        cardiovascularRisk: newMedicalForm.cardiovascularRisk,
        recommendations =newMedicalForm.recommendations
      })
      .then(response => {
        console.log("Registrado");
      });
  };
  