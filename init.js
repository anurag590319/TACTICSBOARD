import { searchAndDisplayTeam, createDraggableBall } from './soccer_team_api.js';
import { applyTactic } from './tactics.js';

document.addEventListener('DOMContentLoaded', () => {
    const soccerPitch = document.getElementById('soccer-pitch');

    // Dynamically add event listeners to search icons
    const teamSearchIcon = document.getElementById('search-team-icon');
    const opponentSearchIcon = document.getElementById('search-opponent-icon');

    if (teamSearchIcon) {
        teamSearchIcon.addEventListener('click', () => {
            const teamName = document.getElementById('team-name-search').value;
            if (teamName) {
                searchAndDisplayTeam(teamName, soccerPitch, 'blue', false).then(() => {
                    if (!document.querySelector('.soccer-ball')) {
                        createDraggableBall(soccerPitch);
                    }
                });
            }
        });
    }

    if (opponentSearchIcon) {
        opponentSearchIcon.addEventListener('click', () => {
            const opponentName = document.getElementById('opponent-name-search').value;
            if (opponentName) {
                searchAndDisplayTeam(opponentName, soccerPitch, 'red', true).then(() => {
                    if (!document.querySelector('.soccer-ball')) {
                        createDraggableBall(soccerPitch);
                    }
                });
            }
        });
    }

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
});
