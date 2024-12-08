let myTeamPlayers = [];
let opponentTeamPlayers = [];

async function searchAndDisplayTeam(teamName, soccerPitch, color, isOpponent = false) {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "06e4cd1032msh6159bbb6f7a2c83p167e4ejsn5c1752041758");
    myHeaders.append("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    console.log(`Fetching team with name: ${teamName}`);

    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?search=${encodeURIComponent(teamName)}`, requestOptions);
    
    if (!response.ok) {
        console.error(`Error fetching team data: ${response.status} ${response.statusText}`);
        alert(`Error fetching team data: ${response.status} ${response.statusText}`);
        return;
    }

    const teams = await response.json();
    console.log('Teams Response:', teams);

    if (teams.response && teams.response.length > 0) {
        const team = teams.response[0].team;
        console.log('Team Found:', team);

        if (isOpponent) {
            opponentTeamPlayers = [];
        } else {
            myTeamPlayers = [];
        }

        await loadAndDisplayPlayers(team.id, soccerPitch, color, isOpponent);
    } else {
        alert('Team not found! Please try another team name.');
    }
}

async function loadAndDisplayPlayers(teamId, soccerPitch, color, isOpponent) {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "06e4cd1032msh6159bbb6f7a2c83p167e4ejsn5c1752041758");
    myHeaders.append("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    console.log(`Fetching players for team ID: ${teamId}`);
    
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${teamId}`, requestOptions);
    if (!response.ok) {
        console.error(`Error fetching player data: ${response.status} ${response.statusText}`);
        alert(`Error fetching player data: ${response.status} ${response.statusText}`);
        return;
    }

    const players = await response.json();
    console.log('Players Response:', players);

    if (players.response && players.response.length > 0 && players.response[0].players) {
        const formation = isOpponent ? getFormationRight() : getFormationLeft();

        players.response[0].players.slice(0, 11).forEach((player, index) => {
            const position = formation[index];
            const playerElement = createDraggablePlayer(player, position.top, position.left, color, soccerPitch);
            if (isOpponent) {
                opponentTeamPlayers.push(playerElement);
            } else {
                myTeamPlayers.push(playerElement);
            }
        });
    } else {
        alert('No players found for this team!');
    }
}

function createDraggablePlayer(player, top, left, color, soccerPitch) {
    let playerElement = document.createElement('button');
    playerElement.className = `player-button ${color}`;
    playerElement.textContent = player.name;
    playerElement.style.top = top;
    playerElement.style.left = left;
    playerElement.style.position = 'absolute';
    playerElement.style.cursor = 'grab';

    addDraggingFunctionality(playerElement, soccerPitch);

    soccerPitch.appendChild(playerElement);
    return playerElement;
}

// Create and load the soccer ball on the pitch
function createDraggableBall(soccerPitch) {
    console.log('Creating draggable ball...');
    const ball = document.createElement('img');
    ball.src = 'soccer-ball.png'; // Ensure this image file exists in your project
    ball.className = 'soccer-ball';

    // Center the ball on the pitch
    const left = (soccerPitch.clientWidth / 2) - 15; // Adjust for ball size
    const top = (soccerPitch.clientHeight / 2) - 15;

    ball.style.position = 'absolute';
    ball.style.left = `${left}px`;
    ball.style.top = `${top}px`;
    ball.style.cursor = 'grab';
    ball.style.width = '30px';
    ball.style.height = '30px';

    addDraggingFunctionality(ball, soccerPitch);

    soccerPitch.appendChild(ball);
    return ball;
}

function addDraggingFunctionality(element, container) {
    let isDragging = false;

    const onMove = (x, y) => {
        const containerRect = container.getBoundingClientRect();
        let left = x - containerRect.left - element.clientWidth / 2;
        let top = y - containerRect.top - element.clientHeight / 2;

        left = Math.max(0, Math.min(left, container.clientWidth - element.clientWidth));
        top = Math.max(0, Math.min(top, container.clientHeight - element.clientHeight));

        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    };

    element.addEventListener('mousedown', () => {
        isDragging = true;
        element.style.cursor = 'grabbing';
    });

    element.addEventListener('touchstart', () => {
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) onMove(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) onMove(e.touches[0].clientX, e.touches[0].clientY);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        element.style.cursor = 'grab';
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}


function getFormationLeft() {
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
}

function getFormationRight() {
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
}

export { searchAndDisplayTeam, myTeamPlayers, opponentTeamPlayers, createDraggableBall };

// Initialize the ball and players when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const soccerPitch = document.getElementById('soccer-pitch');
    createDraggableBall(soccerPitch);

    // Attach event listeners for team search inputs
    document.getElementById('team-name-search').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const teamName = e.target.value;
            if (teamName) {
                searchAndDisplayTeam(teamName, soccerPitch, 'blue', false);
            }
        }
    });

    document.getElementById('opponent-name-search').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const opponentName = e.target.value;
            if (opponentName) {
                searchAndDisplayTeam(opponentName, soccerPitch, 'red', true);
            }
        }
    });
});
//