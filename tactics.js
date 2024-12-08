// tactics.js
import { myTeamPlayers, opponentTeamPlayers } from './soccer_team_api.js';

function applyTactic(tacticNumber) {
    const myTeamFormation = getMyTeamTacticPositions(tacticNumber);
    const opponentTeamFormation = getOpponentTeamTacticPositions(tacticNumber);

    // Now we pass the formations into getBallTacticPosition
    const ballPosition = getBallTacticPosition(tacticNumber, myTeamFormation, opponentTeamFormation);

    // Apply positions to my team players
    if (myTeamPlayers.length === 11) {
        myTeamPlayers.forEach((playerEl, idx) => {
            playerEl.style.top = myTeamFormation[idx].top;
            playerEl.style.left = myTeamFormation[idx].left;
        });
    }

    // Apply positions to opponent team players
    if (opponentTeamPlayers.length === 11) {
        opponentTeamPlayers.forEach((playerEl, idx) => {
            playerEl.style.top = opponentTeamFormation[idx].top;
            playerEl.style.left = opponentTeamFormation[idx].left;
        });
    }

    // Apply position to the ball (if it exists)
    const ball = document.querySelector('.soccer-ball');
    if (ball && ballPosition) {
        ball.style.top = ballPosition.top;
        ball.style.left = ballPosition.left;
    }
}

function getMyTeamTacticPositions(tacticNumber) {
    switch(tacticNumber) {
        case 1:
            return [
                { top: '50%', left: '5%' },
                { top: '10%', left: '20%' },
                { top: '40%', left: '20%' },
                { top: '75%', left: '20%' },
                { top: '90%', left: '20%' },
                { top: '20%', left: '40%' },
                { top: '35%', left: '40%' },
                { top: '65%', left: '40%' },
                { top: '85%', left: '40%' },
                { top: '30%', left: '60%' },
                { top: '60%', left: '60%' }
            ];
        case 2:
            return [
                { top: '45%', left: '10%' },
                { top: '15%', left: '25%' },
                { top: '35%', left: '25%' },
                { top: '70%', left: '25%' },
                { top: '85%', left: '25%' },
                { top: '25%', left: '45%' },
                { top: '40%', left: '45%' },
                { top: '55%', left: '45%' },
                { top: '75%', left: '45%' },
                { top: '35%', left: '65%' },
                { top: '65%', left: '65%' }
            ];
        case 3:
            return [
                { top: '40%', left: '15%' },
                { top: '20%', left: '30%' },
                { top: '50%', left: '30%' },
                { top: '80%', left: '30%' },
                { top: '90%', left: '30%' },
                { top: '20%', left: '50%' },
                { top: '40%', left: '50%' },
                { top: '60%', left: '50%' },
                { top: '80%', left: '50%' },
                { top: '25%', left: '70%' },
                { top: '55%', left: '70%' }
            ];
        default:
            return [];
    }
}

function getOpponentTeamTacticPositions(tacticNumber) {
    switch(tacticNumber) {
        case 1:
            return [
                { top: '50%', left: '95%' },
                { top: '90%', left: '80%' },
                { top: '60%', left: '80%' },
                { top: '25%', left: '80%' },
                { top: '10%', left: '80%' },
                { top: '80%', left: '60%' },
                { top: '65%', left: '60%' },
                { top: '35%', left: '60%' },
                { top: '15%', left: '60%' },
                { top: '70%', left: '40%' },
                { top: '40%', left: '40%' }
            ];
        case 2:
            return [
                { top: '55%', left: '90%' },
                { top: '85%', left: '75%' },
                { top: '65%', left: '75%' },
                { top: '30%', left: '75%' },
                { top: '15%', left: '75%' },
                { top: '85%', left: '55%' },
                { top: '65%', left: '55%' },
                { top: '45%', left: '55%' },
                { top: '25%', left: '55%' },
                { top: '70%', left: '35%' },
                { top: '40%', left: '35%' }
            ];
        case 3:
            return [
                { top: '45%', left: '85%' },
                { top: '85%', left: '70%' },
                { top: '65%', left: '70%' },
                { top: '35%', left: '70%' },
                { top: '20%', left: '70%' },
                { top: '85%', left: '50%' },
                { top: '65%', left: '50%' },
                { top: '45%', left: '50%' },
                { top: '25%', left: '50%' },
                { top: '70%', left: '30%' },
                { top: '40%', left: '30%' }
            ];
        default:
            return [];
    }
}

// Adjust this function so the ball is placed based on player positions
function getBallTacticPosition(tacticNumber, myTeamFormation, opponentTeamFormation) {
    // Convert percentage strings like "50%" into numeric values if needed
    function toNumeric(position) {
        return parseFloat(position);
    }

    switch(tacticNumber) {
        case 1:
            // Example: Place the ball near the first player of my team
            // Player 0 top/left
            let player0Top = myTeamFormation[0].top;
            let player0Left = myTeamFormation[0].left;

            // Slightly adjust the ball position relative to the player
            return { 
                top: player0Top, 
                left: player0Left 
            };

        case 2:
            // Example: Place the ball between my team's first forward and opponent's first defender.
            // Let's say my team player #10 (index 9) and opponent player #0
            let myPlayer9Top = toNumeric(myTeamFormation[9].top);
            let myPlayer9Left = toNumeric(myTeamFormation[9].left);

            let oppPlayer0Top = toNumeric(opponentTeamFormation[0].top);
            let oppPlayer0Left = toNumeric(opponentTeamFormation[0].left);

            // Compute midpoint
            let ballTop = (myPlayer9Top + oppPlayer0Top) / 2 + '%';
            let ballLeft = (myPlayer9Left + oppPlayer0Left) / 2 + '%';

            return { top: ballTop, left: ballLeft };

        case 3:
            // Example: Place the ball near an opponent player (#5)
            let oppPlayer5Top = opponentTeamFormation[5].top;
            let oppPlayer5Left = opponentTeamFormation[5].left;
            return { top: oppPlayer5Top, left: oppPlayer5Left };

        default:
            return null;
    }
}

export { applyTactic };


