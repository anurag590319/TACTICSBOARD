import { searchAndDisplayTeam, createDraggableBall } from './soccer_team_api.js';
import { applyTactic } from './tactics.js';

document.addEventListener('DOMContentLoaded', () => {
    const soccerPitch = document.getElementById('soccer-pitch');

    // Add any other DOM initialization logic here...

    // Handle resizing to keep players and ball in relative positions
    window.addEventListener('resize', () => {
        const pitchRect = soccerPitch.getBoundingClientRect();

        // Update player positions
        document.querySelectorAll('.player-button').forEach(player => {
            const leftPercent = (parseFloat(player.style.left) / pitchRect.width) * 100;
            const topPercent = (parseFloat(player.style.top) / pitchRect.height) * 100;

            player.style.left = `${leftPercent}%`;
            player.style.top = `${topPercent}%`;
        });

        // Update ball position
        const ball = document.querySelector('.soccer-ball');
        if (ball) {
            const ballLeftPercent = (parseFloat(ball.style.left) / pitchRect.width) * 100;
            const ballTopPercent = (parseFloat(ball.style.top) / pitchRect.height) * 100;

            ball.style.left = `${ballLeftPercent}%`;
            ball.style.top = `${ballTopPercent}%`;
        }
    });
});


    // Attach tactics button listeners
    document.getElementById('tactic1-button').addEventListener('click', () => {
        applyTactic(1);
    });

    document.getElementById('tactic2-button').addEventListener('click', () => {
        applyTactic(2);
    });

    document.getElementById('tactic3-button').addEventListener('click', () => {
        applyTactic(3);
    });
    
