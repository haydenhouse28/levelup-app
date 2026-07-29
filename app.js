const STORAGE_KEY = "levelup_lifetime_v3";

let player = loadPlayer();

let pendingQuestIndex = null;


/* =========================================================
   QUEST LIBRARY
   ========================================================= */

const generalQuests = [

    {
        category: "MOVEMENT",
        title: "Go 2 Miles",
        description: "Walk, jog, or run for at least 2 miles.",
        xp: 35,
        type: "distance",
        target: 2,
        unit: "miles"
    },

    {
        category: "TRAINING",
        title: "30-Minute Workout",
        description: "Complete a focused workout session.",
        xp: 40,
        type: "workout",
        target: 30,
        unit: "minutes"
    },

    {
        category: "RECOVERY",
        title: "Mobility Session",
        description: "Spend at least 15 minutes stretching or working on mobility.",
        xp: 25,
        type: "minutes",
        target: 15,
        unit: "minutes"
    },

    {
        category: "MINDSET",
        title: "20 Minutes of Learning",
        description: "Read, study, watch something educational, or learn a useful skill.",
        xp: 25,
        type: "minutes",
        target: 20,
        unit: "minutes"
    },

    {
        category: "DISCIPLINE",
        title: "Do Something Difficult",
        description: "Choose something productive you've been putting off.",
        xp: 30,
        type: "simple",
        target: 1,
        unit: "task"
    },

    {
        category: "RECOVERY",
        title: "Take a Real Recovery Break",
        description: "Spend at least 20 minutes intentionally recovering.",
        xp: 25,
        type: "minutes",
        target: 20,
        unit: "minutes"
    }

];


/* =========================================================
   SPORT LIBRARY
   ========================================================= */

const sportWorkouts = {

    Baseball: [

        {
            title: "Baseball Skill Session",
            description: "Hitting, throwing, fielding, or catching work.",
            duration: 30,
            focus: "Skills"
        },

        {
            title: "Throwing + Arm Care",
            description: "Controlled throwing followed by arm-care work.",
            duration: 25,
            focus: "Arm Care"
        },

        {
            title: "Defensive Footwork",
            description: "Work on first-step quickness, lateral movement, and glove work.",
            duration: 25,
            focus: "Defense"
        },

        {
            title: "Hitting Session",
            description: "Focused tee, front toss, or cage work.",
            duration: 30,
            focus: "Hitting"
        }

    ],

    Lacrosse: [

        {
            title: "Stick Work Session",
            description: "Wall ball, passing, catching, and weak-hand work.",
            duration: 30,
            focus: "Stick Skills"
        },

        {
            title: "Dodging Session",
            description: "Work on dodges, change of direction, and attacking movement.",
            duration: 25,
            focus: "Dodging"
        },

        {
            title: "Shooting Session",
            description: "Practice shooting mechanics and different shot locations.",
            duration: 30,
            focus: "Shooting"
        },

        {
            title: "Lacrosse Footwork",
            description: "Agility, acceleration, deceleration, and defensive movement.",
            duration: 25,
            focus: "Athleticism"
        }

    ],

    Basketball: [

        {
            title: "Ball Handling",
            description: "Focused dribbling and change-of-direction work.",
            duration: 25,
            focus: "Handles"
        },

        {
            title: "Shooting Session",
            description: "Work on form, catch-and-shoot, and game-speed shots.",
            duration: 30,
            focus: "Shooting"
        },

        {
            title: "Finishing Session",
            description: "Practice finishing with both hands and different angles.",
            duration: 25,
            focus: "Finishing"
        }

    ],

    Soccer: [

        {
            title: "First Touch Session",
            description: "Work on receiving, passing, and ball control.",
            duration: 30,
            focus: "Ball Control"
        },

        {
            title: "Finishing Session",
            description: "Practice shooting and finishing from different positions.",
            duration: 30,
            focus: "Finishing"
        },

        {
            title: "Footwork + Agility",
            description: "Work on quick feet, acceleration, and change of direction.",
            duration: 25,
            focus: "Athleticism"
        }

    ],

    Football: [

        {
            title: "Footwork Session",
            description: "Work on quick feet, change of direction, and acceleration.",
            duration: 25,
            focus: "Footwork"
        },

        {
            title: "Position Skills",
            description: "Practice skills specific to your football position.",
            duration: 30,
            focus: "Skills"
        }

    ],

    Hockey: [

        {
            title: "Stickhandling Session",
            description: "Work on control, hands, and puck movement.",
            duration: 30,
            focus: "Stick Skills"
        },

        {
            title: "Skating Movement",
            description: "Work on speed, edges, and directional movement.",
            duration: 30,
            focus: "Skating"
        }

    ],

    Tennis: [

        {
            title: "Footwork Session",
            description: "Practice split steps, lateral movement, and court positioning.",
            duration: 25,
            focus: "Footwork"
        },

        {
            title: "Stroke Session",
            description: "Work on your groundstrokes, serves, or volleys.",
            duration: 30,
            focus: "Technique"
        }

    ],

    Track: [

        {
            title: "Running Session",
            description: "Complete a focused running workout appropriate for your training.",
            duration: 30,
            focus: "Running"
        },

        {
            title: "Running Mechanics",
            description: "Work on posture, drills, mobility, and running mechanics.",
            duration: 25,
            focus: "Technique"
        }

    ],

    Volleyball: [

        {
            title: "Serving Session",
            description: "Practice consistent serving technique.",
            duration: 25,
            focus: "Serving"
        },

        {
            title: "Passing + Ball Control",
            description: "Work on passing and controlled touches.",
            duration: 30,
            focus: "Ball Control"
        }

    ]

};


/* =========================================================
   MYSTERY MISSIONS
   ========================================================= */

const mysteryPool = [

    {
        title: "The Compliment",
        description: "Give someone a genuine compliment."
    },

    {
        title: "The Explorer",
        description: "Take a walk somewhere you normally wouldn't."
    },

    {
        title: "The Helper",
        description: "Do something helpful without being asked."
    },

    {
        title: "The Hard Thing",
        description: "Complete one productive thing you've been avoiding."
    },

    {
        title: "The Connection",
        description: "Reach out to someone you haven't talked to recently."
    },

    {
        title: "The Reset",
        description: "Spend 15 minutes organizing or cleaning something."
    },

    {
        title: "The Learner",
        description: "Learn something completely new today."
    }

];


/* =========================================================
   STORAGE
   ========================================================= */

function loadPlayer() {

    try {

        return JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

    } catch {

        return null;

    }

}


function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(player)
    );

}


/* =========================================================
   DEFAULT PLAYER
   ========================================================= */

function createPlayer(name, sport, goal) {

    return {

        name,
        sport,
        goal,

        level: 1,
        xp: 0,
        totalXP: 0,

        questsCompleted: 0,
        workouts: 0,
        totalWorkoutMinutes: 0,
        miles: 0,

        activeDays: 0,
        currentStreak: 0,
        bestStreak: 0,

        longestDistance: 0,
        longestWorkout: 0,
        bestXPDay: 0,

        lastActiveDate: null,

        todayXP: 0,
        todayDate: getDateKey(),

        quests: [],
        questDate: null,

        mystery: null,
        mysteryDate: null,
        mysteryCompleted: false,

        swapUsed: false,
        swapDate: null,

        meals: [],
        mealDate: null,
        water: 0,

        history: []

    };

}


/* =========================================================
   PROFILE CREATION
   ========================================================= */

function createProfile() {

    const name =
        document.getElementById("name-input")
        .value
        .trim();

    const sport =
        document.getElementById("sport-input")
        .value;

    const goal =
        document.getElementById("goal-input")
        .value;


    if (!name) {

        alert("Enter your name first.");

        return;

    }


    player =
        createPlayer(
            name,
            sport,
            goal
        );


    prepareToday();

    save();

    loadApp();

}


/* =========================================================
   DATE
   ========================================================= */

function getDateKey(date = new Date()) {

    return date.toISOString()
        .split("T")[0];

}


function formatDate() {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            weekday: "short",
            month: "short",
            day: "numeric"
        }
    ).format(new Date());

}


/* =========================================================
   LEVEL SYSTEM
   ========================================================= */

function getXPNeeded() {

    return Math.floor(
        100 *
        Math.pow(
            1.35,
            player.level - 1
        )
    );

}


function awardXP(amount) {

    player.xp += amount;
    player.totalXP += amount;
    player.todayXP += amount;


    if (
        player.todayXP >
        player.bestXPDay
    ) {

        player.bestXPDay =
            player.todayXP;

    }


    let leveledUp = false;


    while (
        player.xp >= getXPNeeded()
    ) {

        player.xp -= getXPNeeded();

        player.level++;

        leveledUp = true;

    }


    if (leveledUp) {

        setTimeout(() => {

            alert(
                "🚀 LEVEL UP!\n\nYou reached Level " +
                player.level
            );

        }, 250);

    }

}


/* =========================================================
   DAILY SETUP
   ========================================================= */

function prepareToday() {

    const today =
        getDateKey();


    if (
        player.questDate !== today
    ) {

        player.quests =
            generateDailyQuests();

        player.questDate =
            today;

        player.swapUsed =
            false;

        player.swapDate =
            today;

        player.todayXP =
            0;

        player.todayDate =
            today;

    }


    if (
        player.mysteryDate !== today
    ) {

        player.mystery =
            null;

        player.mysteryDate =
            today;

        player.mysteryCompleted =
            false;

    }


    if (
        player.mealDate !== today
    ) {

        player.meals = [];

        player.water = 0;

        player.mealDate =
            today;

    }


    save();

}


/* =========================================================
   RANDOMIZATION
   ========================================================= */

function shuffle(array) {

    return [...array]
        .sort(
            () => Math.random() - 0.5
        );

}


function getSportMission() {

    const workouts =
        sportWorkouts[player.sport];


    if (
        !workouts ||
        !workouts.length
    ) {

        return null;

    }


    const workout =
        workouts[
            Math.floor(
                Math.random() *
                workouts.length
            )
        ];


    return {

        category: "SPORT",
        title: workout.title,
        description: workout.description,
        xp: 40,
        type: "sportWorkout",
        target: workout.duration,
        unit: "minutes",
        focus: workout.focus

    };

}


/* =========================================================
   DAILY MISSIONS
   ========================================================= */

function generateDailyQuests() {

    const pool =
        shuffle(generalQuests);


    let quests = [];


    /* Always try to include a sport mission */

    const sportMission =
        getSportMission();


    if (sportMission) {

        quests.push(
            sportMission
        );

    }


    /* Add two general missions */

    const remaining =
        pool
            .filter(
                q =>
                    !quests.some(
                        x =>
                            x.title === q.title
                    )
            )
            .slice(0, 2);


    quests.push(
        ...remaining
    );


    return quests.map(
        (quest, index) => ({

            id:
                Date.now() +
                "-" +
                index +
                "-" +
                Math.random(),

            ...quest,

            completed: false,
            actualValue: null,
            earnedXP: 0

        })
    );

}


/* =========================================================
   RENDER QUESTS
   ========================================================= */

function renderQuests() {

    const container =
        document.getElementById(
            "quest-container"
        );


    container.innerHTML = "";


    player.quests.forEach(
        (quest, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "quest" +
                (
                    quest.completed
                        ? " completed"
                        : ""
                );


            let targetText =
                "";


            if (
                quest.type === "distance"
            ) {

                targetText =
                    `Goal: ${quest.target} miles`;

            }


            else if (
                quest.type === "workout" ||
                quest.type === "sportWorkout" ||
                quest.type === "minutes"
            ) {

                targetText =
                    `Goal: ${quest.target} minutes`;

            }


            card.innerHTML = `

                <div class="quest-top">

                    <div>

                        <div class="quest-category">
                            ${quest.category}
                        </div>

                        <div class="quest-title">
                            ${quest.title}
                        </div>

                    </div>

                    <div class="quest-xp">
                        +${quest.xp} XP
                    </div>

                </div>

                <div class="quest-description">
                    ${quest.description}
                </div>

                ${
                    targetText
                        ? `<div class="quest-target">${targetText}</div>`
                        : ""
                }

                <button
                    class="quest-button"
                    onclick="openQuest(${index})"
                    ${quest.completed ? "disabled" : ""}
                >
                    ${
                        quest.completed
                            ? `✓ Completed +${quest.earnedXP} XP`
                            : "Complete Mission"
                    }
                </button>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================================
   COMPLETE QUEST
   ========================================================= */

function openQuest(index) {

    const quest =
        player.quests[index];


    if (
        !quest ||
        quest.completed
    ) {

        return;

    }


    pendingQuestIndex =
        index;


    document.getElementById(
        "modal-title"
    ).textContent =
        quest.title;


    document.getElementById(
        "modal-description"
    ).textContent =
        quest.description;


    const area =
        document.getElementById(
            "measurement-area"
        );


    area.innerHTML = "";


    if (
        quest.type === "distance"
    ) {

        area.innerHTML = `

            <label>
                How many miles did you actually go?
            </label>

            <input
                id="actual-value"
                type="number"
                min="0"
                step="0.1"
                placeholder="Example: 2.4"
            >

            <p class="muted">
                Goal: ${quest.target} miles.
                You'll receive partial XP if you don't reach it.
            </p>

        `;

    }


    else if (
        quest.type === "workout" ||
        quest.type === "sportWorkout" ||
        quest.type === "minutes"
    ) {

        area.innerHTML = `

            <label>
                How many minutes did you actually train?
            </label>

            <input
                id="actual-value"
                type="number"
                min="0"
                step="1"
                placeholder="Example: 42"
            >

            <p class="muted">
                Goal: ${quest.target} minutes.
                Going beyond the goal can earn bonus XP.
            </p>

        `;

    }


    else {

        area.innerHTML = `

            <p class="muted">
                Mark this complete only after you
                actually finish it.
            </p>

        `;

    }


    document.getElementById(
        "modal-xp"
    ).textContent =
        "+" +
        quest.xp +
        " XP";


    document.getElementById(
        "quest-modal"
    ).classList.remove(
        "hidden"
    );

}


function closeQuestModal() {

    document.getElementById(
        "quest-modal"
    ).classList.add(
        "hidden"
    );

    pendingQuestIndex =
        null;

}


/* =========================================================
   XP CALCULATION
   ========================================================= */

function calculateReward(
    quest,
    actual
) {

    if (
        quest.type === "simple"
    ) {

        return quest.xp;

    }


    if (
        !actual ||
        actual <= 0
    ) {

        return 0;

    }


    const ratio =
        actual /
        quest.target;


    if (ratio < 1) {

        return Math.max(
            5,
            Math.floor(
                quest.xp *
                ratio
            )
        );

    }


    let reward =
        quest.xp;


    /* Bonus after target */

    if (
        ratio >= 1.25
    ) {

        reward += 5;

    }

    if (
        ratio >= 1.5
    ) {

        reward += 5;

    }

    if (
        ratio >= 2
    ) {

        reward += 10;

    }


    return reward;

}


/* =========================================================
   FINISH QUEST
   ========================================================= */

function finishQuest() {

    if (
        pendingQuestIndex === null
    ) {

        return;

    }


    const quest =
        player.quests[
            pendingQuestIndex
        ];


    if (
        !quest ||
        quest.completed
    ) {

        closeQuestModal();

        return;

    }


    let actual =
        null;


    if (
        quest.type !== "simple"
    ) {

        actual =
            parseFloat(
                document.getElementById(
                    "actual-value"
                ).value
            );


        if (
            !actual ||
            actual <= 0
        ) {

            alert(
                "Enter what you actually completed."
            );

            return;

        }

    }


    const reward =
        calculateReward(
            quest,
            actual
        );


    quest.completed =
        true;

    quest.actualValue =
        actual;

    quest.earnedXP =
        reward;


    /* Lifetime stats */

    if (
        quest.type === "distance"
    ) {

        player.miles += actual;


        if (
            actual >
            player.longestDistance
        ) {

            player.longestDistance =
                actual;

        }

    }


    if (
        quest.type === "workout" ||
        quest.type === "sportWorkout"
    ) {

        player.workouts++;

        player.totalWorkoutMinutes +=
            actual;


        if (
            actual >
            player.longestWorkout
        ) {

            player.longestWorkout =
                actual;

        }

    }


    player.questsCompleted++;


    awardXP(reward);

    markActiveDay();


    addHistory({

        date:
            getDateKey(),

        title:
            quest.title,

        xp:
            reward,

        value:
            actual,

        unit:
            quest.unit

    });


    save();


    closeQuestModal();

    updateEverything();


    alert(
        "Mission complete!\n\n+" +
        reward +
        " XP"
    );

}


/* =========================================================
   STREAK
   ========================================================= */

function markActiveDay() {

    const today =
        getDateKey();


    if (
        player.lastActiveDate ===
        today
    ) {

        return;

    }


    if (
        !player.lastActiveDate
    ) {

        player.currentStreak =
            1;

    }

    else {

        const oldDate =
            new Date(
                player.lastActiveDate +
                "T00:00:00"
            );

        const newDate =
            new Date(
                today +
                "T00:00:00"
            );


        const difference =
            Math.round(
                (
                    newDate -
                    oldDate
                ) /
                86400000
            );


        if (
            difference === 1
        ) {

            player.currentStreak++;

        }

        else if (
            difference > 1
        ) {

            player.currentStreak =
                1;

        }

    }


    player.lastActiveDate =
        today;


    player.activeDays++;


    if (
        player.currentStreak >
        player.bestStreak
    ) {

        player.bestStreak =
            player.currentStreak;

    }

}


/* =========================================================
   SWAP SYSTEM
   ========================================================= */

function openSwapModal() {

    if (
        player.swapUsed
    ) {

        alert(
            "You've already used your one swap today."
        );

        return;

    }


    const list =
        document.getElementById(
            "swap-list"
        );


    list.innerHTML = "";


    player.quests.forEach(
        (quest, index) => {

            if (
                quest.completed
            ) {

                return;

            }


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "swap-choice";


            button.innerHTML = `

                <strong>
                    ${quest.title}
                </strong>

                <small>
                    ${quest.description}
                </small>

            `;


            button.onclick =
                () =>
                    swapSpecificQuest(
                        index
                    );


            list.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "swap-modal"
    ).classList.remove(
        "hidden"
    );

}


function closeSwapModal() {

    document.getElementById(
        "swap-modal"
    ).classList.add(
        "hidden"
    );

}


function swapSpecificQuest(
    index
) {

    if (
        player.swapUsed
    ) {

        return;

    }


    const oldQuest =
        player.quests[index];


    let replacement;


    let attempts = 0;


    do {

        if (
            Math.random() < .45
        ) {

            replacement =
                getSportMission();

        }


        if (!replacement) {

            replacement =
                shuffle(
                    generalQuests
                )[0];

        }


        attempts++;

    } while (

        replacement.title ===
        oldQuest.title

        &&
        attempts < 10

    );


    player.quests[index] = {

        id:
            Date.now() +
            "-" +
            Math.random(),

        ...replacement,

        completed: false,
        actualValue: null,
        earnedXP: 0

    };


    player.swapUsed =
        true;


    save();

    closeSwapModal();

    updateEverything();

}


/* =========================================================
   MYSTERY
   ========================================================= */

function revealMystery() {

    if (
        player.mystery ||
        player.mysteryCompleted
    ) {

        return;

    }


    player.mystery =
        mysteryPool[
            Math.floor(
                Math.random() *
                mysteryPool.length
            )
        ];


    save();

    updateMystery();

}


function updateMystery() {

    const text =
        document.getElementById(
            "mystery-text"
        );

    const reward =
        document.getElementById(
            "mystery-reward"
        );

    const reveal =
        document.getElementById(
            "reveal-button"
        );

    const complete =
        document.getElementById(
            "complete-mystery"
        );


    if (
        !player.mystery
    ) {

        text.textContent =
            "You don't know what's coming.";

        reward.textContent =
            "+50 XP";

        reveal.classList.remove(
            "hidden"
        );

        complete.classList.add(
            "hidden"
        );

        return;

    }


    text.textContent =
        player.mystery.title +
        ": " +
        player.mystery.description;


    reward.textContent =
        "+50 XP";


    reveal.classList.add(
        "hidden"
    );


    complete.classList.remove(
        "hidden"
    );


    if (
        player.mysteryCompleted
    ) {

        complete.textContent =
            "✓ Completed";

        complete.disabled =
            true;

    }

}


function completeMystery() {

    if (
        player.mysteryCompleted
    ) {

        return;

    }


    document.getElementById(
        "mystery-modal"
    ).classList.remove(
        "hidden"
    );

}


function closeMysteryModal() {

    document.getElementById(
        "mystery-modal"
    ).classList.add(
        "hidden"
    );

}


function finishMystery() {

    if (
        !player.mystery ||
        player.mysteryCompleted
    ) {

        return;

    }


    player.mysteryCompleted =
        true;


    player.questsCompleted++;


    awardXP(50);

    markActiveDay();


    addHistory({

        date:
            getDateKey(),

        title:
            player.mystery.title,

        xp:
            50,

        value:
            null,

        unit:
            null

    });


    save();

    closeMysteryModal();

    updateEverything();


    alert(
        "Mystery complete!\n\n+50 XP"
    );

}


/* =========================================================
   HISTORY
   ========================================================= */

function addHistory(item) {

    player.history.unshift(
        item
    );


    if (
        player.history.length >
        300
    ) {

        player.history =
            player.history.slice(
                0,
                300
            );

    }

}


function renderHistory() {

    const container =
        document.getElementById(
            "history-container"
        );


    if (
        !player.history.length
    ) {

        container.innerHTML = `

            <div class="history-row">

                <div>
                    <span>No activity yet</span>
                    <small>
                        Complete your first mission.
                    </small>
                </div>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    player.history
        .slice(0, 15)
        .forEach(
            item => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "history-row";


                let detail =
                    "+" +
                    item.xp +
                    " XP";


                if (
                    item.value
                ) {

                    detail +=
                        " • " +
                        item.value +
                        " " +
                        item.unit;

                }


                row.innerHTML = `

                    <div>
                        <span>
                            ${item.title}
                        </span>

                        <small>
                            ${item.date}
                        </small>
                    </div>

                    <strong>
                        ${detail}
                    </strong>

                `;


                container.appendChild(
                    row
                );

            }
        );

}


/* =========================================================
   FUEL
   ========================================================= */

function addMeal() {

    const meal =
        prompt(
            "What did you eat?"
        );


    if (
        !meal ||
        !meal.trim()
    ) {

        return;

    }


    player.meals.push({

        name:
            meal.trim(),

        time:
            new Date()
                .toLocaleTimeString(
                    [],
                    {
                        hour: "numeric",
                        minute: "2-digit"
                    }
                )

    });


    save();

    updateFuel();

}


function changeWater(amount) {

    player.water =
        Math.max(
            0,
            player.water +
            amount
        );


    save();

    updateFuel();

}


function updateFuel() {

    document.getElementById(
        "meal-count"
    ).textContent =
        player.meals.length;


    document.getElementById(
        "water-count"
    ).textContent =
        player.water;


    document.getElementById(
        "water-display"
    ).textContent =
        player.water;


    const list =
        document.getElementById(
            "meal-list"
        );


    if (
        !player.meals.length
    ) {

        list.innerHTML = `

            <p class="muted">
                Nothing logged yet today.
            </p>

        `;

        return;

    }


    list.innerHTML = "";


    player.meals.forEach(
        meal => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "meal-item";


            item.innerHTML = `

                <strong>
                    ${meal.name}
                </strong>

                <span>
                    ${meal.time}
                </span>

            `;


            list.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   TRAINING LIBRARY
   ========================================================= */

function updateTraining() {

    const sport =
        player.sport;


    document.getElementById(
        "training-sport"
    ).textContent =
        sport;


    document.getElementById(
        "training-title"
    ).textContent =
        sport +
        " Training";


    const container =
        document.getElementById(
            "training-list"
        );


    const workouts =
        sportWorkouts[sport] ||
        [];


    if (
        !workouts.length
    ) {

        container.innerHTML = `

            <div class="training-card">

                <h3>General Athletic Training</h3>

                <p>
                    Build speed, strength, mobility,
                    conditioning, and movement quality.
                </p>

                <div class="training-meta">
                    <span>30 min</span>
                    <span>Athleticism</span>
                </div>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    workouts.forEach(
        workout => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "training-card";


            card.innerHTML = `

                <div class="small-label">
                    ${workout.focus}
                </div>

                <h3>
                    ${workout.title}
                </h3>

                <p>
                    ${workout.description}
                </p>

                <div class="training-meta">

                    <span>
                        ${workout.duration} min
                    </span>

                    <span>
                        ${workout.focus}
                    </span>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   HOME UPDATE
   ========================================================= */

function updateHome() {

    const needed =
        getXPNeeded();


    const percentage =
        Math.min(
            100,
            (
                player.xp /
                needed
            ) *
            100
        );


    document.getElementById(
        "greeting"
    ).textContent =
        "Hey, " +
        player.name +
        ".";


    document.getElementById(
        "profile-initial"
    ).textContent =
        getInitial();


    document.getElementById(
        "level-number"
    ).textContent =
        player.level;


    document.getElementById(
        "xp-current"
    ).textContent =
        player.xp;


    document.getElementById(
        "xp-needed"
    ).textContent =
        needed;


    document.getElementById(
        "xp-bar"
    ).style.width =
        percentage +
        "%";


    document.getElementById(
        "xp-remaining"
    ).textContent =
        (
            needed -
            player.xp
        ) +
        " XP to Level " +
        (
            player.level +
            1
        );


    document.getElementById(
        "total-xp-small"
    ).textContent =
        player.totalXP +
        " lifetime XP";


    document.getElementById(
        "today-completed"
    ).textContent =
        player.quests.filter(
            q =>
                q.completed
        ).length +
        (
            player.mysteryCompleted
                ? 1
                : 0
        );


    document.getElementById(
        "streak-number"
    ).textContent =
        player.currentStreak;


    document.getElementById(
        "lifetime-quests"
    ).textContent =
        player.questsCompleted;


    document.getElementById(
        "today-date"
    ).textContent =
        formatDate();


    document.getElementById(
        "swap-info"
    ).textContent =
        player.swapUsed
            ? "No swaps remaining today"
            : "1 swap available today";

}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {

    document.getElementById(
        "progress-total-xp"
    ).textContent =
        player.totalXP;


    document.getElementById(
        "progress-level"
    ).textContent =
        player.level;


    document.getElementById(
        "progress-quests"
    ).textContent =
        player.questsCompleted;


    document.getElementById(
        "progress-workouts"
    ).textContent =
        player.workouts;


    document.getElementById(
        "progress-miles"
    ).textContent =
        player.miles.toFixed(1);


    document.getElementById(
        "progress-hours"
    ).textContent =
        (
            player.totalWorkoutMinutes /
            60
        ).toFixed(1);


    document.getElementById(
        "record-distance"
    ).textContent =
        player.longestDistance.toFixed(1) +
        " mi";


    document.getElementById(
        "record-workout"
    ).textContent =
        player.longestWorkout +
        " min";


    document.getElementById(
        "record-xp-day"
    ).textContent =
        player.bestXPDay +
        " XP";


    document.getElementById(
        "record-streak"
    ).textContent =
        player.bestStreak +
        " days";


    renderHistory();

}


/* =========================================================
   PROFILE
   ========================================================= */

function getInitial() {

    return player.name
        ? player.name
            .charAt(0)
            .toUpperCase()
        : "A";

}


function updateProfile() {

    const initial =
        getInitial();


    document.getElementById(
        "large-avatar"
    ).textContent =
        initial;


    document.getElementById(
        "profile-name"
    ).textContent =
        player.name;


    document.getElementById(
        "profile-sport"
    ).textContent =
        player.sport;


    document.getElementById(
        "profile-sport-detail"
    ).textContent =
        player.sport;


    document.getElementById(
        "profile-goal"
    ).textContent =
        player.goal;


    document.getElementById(
        "profile-level-detail"
    ).textContent =
        player.level;


    document.getElementById(
        "profile-streak-detail"
    ).textContent =
        player.currentStreak +
        " days";

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(
            p =>
                p.classList.remove(
                    "active-page"
                )
        );


    document
        .querySelectorAll(".nav-item")
        .forEach(
            n =>
                n.classList.remove(
                    "active"
                )
        );


    const screen =
        document.getElementById(
            page +
            "-screen"
        );


    const nav =
        document.getElementById(
            "nav-" +
            page
        );


    if (screen) {

        screen.classList.add(
            "active-page"
        );

    }


    if (nav) {

        nav.classList.add(
            "active"
        );

    }


    if (
        page === "progress"
    ) {

        updateProgress();

    }


    if (
        page === "training"
    ) {

        updateTraining();

    }


    if (
        page === "fuel"
    ) {

        updateFuel();

    }


    if (
        page === "profile"
    ) {

        updateProfile();

    }

}


/* =========================================================
   UPDATE EVERYTHING
   ========================================================= */

function updateEverything() {

    prepareToday();

    updateHome();

    renderQuests();

    updateMystery();

    updateProgress();

    updateTraining();

    updateFuel();

    updateProfile();

}


/* =========================================================
   RESET
   ========================================================= */

function resetApp() {

    const confirmReset =
        confirm(
            "This will erase all of your LevelUp history. Are you sure?"
        );


    if (!confirmReset) {

        return;

    }


    localStorage.removeItem(
        STORAGE_KEY
    );


    location.reload();

}


/* =========================================================
   START
   ========================================================= */

function loadApp() {

    document.getElementById(
        "setup-screen"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "main-app"
    ).classList.remove(
        "hidden"
    );


    updateEverything();

    showPage("home");

}


if (player) {

    loadApp();

}