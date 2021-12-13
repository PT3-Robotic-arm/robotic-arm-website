"use strict";

function angles(A, B, C, COld) {
    // A are the coordinates of the first captor placed on the arm base
    // B are the coordinates of the second captor placed ont the arm elbow
    // C are the coordinates of the third captor placed on the arm edge

    // Calcul de l'angle de rotation de la base du bras

    // ACold is the vector before the movement
    const ACOld = [COld[0] - A[0], COld[1] - A[1]];

    // AC is the vector after the movement
    const AC = [C[0] - A[0], C[1] - A[1]];
    const rotationAngle = (Math.atan2(ACOld[1] * AC[0] - ACOld[0] * AC[1], ACOld[0] * AC[0] + ACOld[1] * AC[1]) * 180 / Math.PI);

    // Calcul of the angle of the second elbow (in the middle of the arm)

    // AB vector is the vector between the elbow and the base
    const AB = [B[0] - A[0], B[1] - A[1]];

    // BC vector is the vector between the elbow and the edge
    const BC = [C[0] - B[0], C[1] - B[1]];
    const rotationCoude = (Math.atan2(BC[1] * AB[0] - BC[0] * AB[1], BC[0] * AB[0] + BC[1] * AB[1]) * 180 / Math.PI);

    // Calcul of the angle of the first elbow (at the base of the arm)

    // AA is the vector representing the absis 
    const AA = [0,1];
    const coudeBaseAngle = (Math.atan2(AA[1] * AB[0] - AA[0] * AB[1], AA[0] * AB[0] + AA[1] * AB[1]) * 180 / Math.PI);

    return {
        rotationAngle: rotationAngle,
        coudeAngle: rotationCoude,
        coudeBaseAngle: coudeBaseAngle
    };
}
let previousData;
const i = setInterval(async () => {
    let currentData = await getLatest();

    if (previousData) {
        let captorOne = currentData.values[0];
        let captorTwo = currentData.values[1];
        let oldCaptorTwo = previousData.values[1];

        console.log(angles([0, 0], [captorOne.x, captorOne.y], [captorTwo.x, captorTwo.y], [oldCaptorTwo.x, oldCaptorTwo.y]))
    }

    previousData = currentData;
    //console.log(currentData);
}, 500);