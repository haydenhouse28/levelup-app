
/* =====================================================
   LEVELUP
   Main Application Logic
===================================================== */


/* =====================================================
   STORAGE
===================================================== */

const STORAGE_KEY = "levelup_app_v6";


/* =====================================================
   DEFAULT DATA
===================================================== */

const DEFAULT_DATA = {

    xp: 0,

    level: 1,

    proteinGoal: 120,

    waterGoal: 80,

    sport: "general",

    name: "",


    /* ---------------------------------------------
       DAILY MISSION SYSTEM
    --------------------------------------------- */

    dailyMissionDate: null,

    dailyMissionIds: [],

    dailySwapUsed: false,


    /* ---------------------------------------------
       MYSTERY SYSTEM
    --------------------------------------------- */

    mysteryDate: null,

    mysteryId: null,

    mysteryCompleted: false,


    /* ---------------------------------------------
       COMPLETION HISTORY
    --------------------------------------------- */

    completedMissions: [],

    lifetimeMissions: 0,


    /* ---------------------------------------------
       STREAK
    --------------------------------------------- */

    currentStreak: 0,

    longestStreak: 0,

    lastMissionDate: null,


    /* ---------------------------------------------
       NUTRITION
    --------------------------------------------- */

    food: {

        breakfast: [],

        lunch: [],

        dinner: [],

        snacks: []

    },


    calorieLifetime: 0,

    proteinLifetime: 0,


    /* ---------------------------------------------
       WATER
    --------------------------------------------- */

    waterByDate: {},

    waterLifetime: 0,


    /* ---------------------------------------------
       SLEEP
    --------------------------------------------- */

    sleepByDate: {},


    /* ---------------------------------------------
       DAYS TRACKED
    --------------------------------------------- */

    trackedDays: []

};


/* =====================================================
   LOAD DATA
===================================================== */

function loadData() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        return structuredClone(DEFAULT_DATA);

    }


    try {

        const parsed =
            JSON.parse(saved);


        return mergeDefaults(
            structuredClone(DEFAULT_DATA),
            parsed
        );

    } catch (error) {

        console.error(
            "Could not load LevelUp data:",
            error
        );

        return structuredClone(DEFAULT_DATA);

    }

}


/* =====================================================
   MERGE OLD DATA WITH DEFAULTS
===================================================== */

function mergeDefaults(defaults, saved) {

    for (const key of Object.keys(saved)) {

        if (
            saved[key] !== null &&
            typeof saved[key] === "object" &&
            !Array.isArray(saved[key]) &&
            typeof defaults[key] === "object"
        ) {

            defaults[key] =
                mergeDefaults(
                    defaults[key],
                    saved[key]
                );

        } else {

            defaults[key] =
                saved[key];

        }

    }

    return defaults;

}


/* =====================================================
   GLOBAL DATA
===================================================== */

let data = loadData();


/* =====================================================
   MISSION DATABASE
===================================================== */

const MISSIONS = [

    /* ---------------------------------------------
       GENERAL FITNESS
    --------------------------------------------- */

    {
        id: "walk-2",
        category: "Fitness",
        icon: "🚶",
        title: "2-Mile Walk",
        description: "Walk at least 2 miles today.",
        xp: 30,
        sport: null
    },

    {
        id: "walk-3",
        category: "Fitness",
        icon: "🚶",
        title: "3-Mile Walk",
        description: "Walk at least 3 miles today.",
        xp: 40,
        sport: null
    },

    {
        id: "run-1",
        category: "Fitness",
        icon: "🏃",
        title: "1-Mile Run",
        description: "Run at least 1 mile.",
        xp: 40,
        sport: null
    },

    {
        id: "run-2",
        category: "Fitness",
        icon: "🏃",
        title: "2-Mile Run",
        description: "Run at least 2 miles.",
        xp: 55,
        sport: null
    },

    {
        id: "pushups-50",
        category: "Fitness",
        icon: "💪",
        title: "50 Push-Ups",
        description: "Complete 50 push-ups.",
        xp: 35,
        sport: null
    },

    {
        id: "squats-50",
        category: "Fitness",
        icon: "🦵",
        title: "50 Squats",
        description: "Complete 50 bodyweight squats.",
        xp: 30,
        sport: null
    },

    {
        id: "plank-2",
        category: "Recovery",
        icon: "🧱",
        title: "2 Minutes of Planks",
        description: "Accumulate 2 total minutes of planks.",
        xp: 30,
        sport: null
    },

    {
        id: "stretch-10",
        category: "Recovery",
        icon: "🧘",
        title: "10-Minute Stretch",
        description: "Complete a full-body stretching session.",
        xp: 25,
        sport: null
    },

    {
        id: "phone-free-30",
        category: "Recovery",
        icon: "📵",
        title: "30 Minutes Phone-Free",
        description: "Spend 30 minutes completely off your phone.",
        xp: 25,
        sport: null
    },


    /* ---------------------------------------------
       COMFORT ZONE
    --------------------------------------------- */

    {
        id: "say-hi-5",
        category: "Comfort Zone",
        icon: "👋",
        title: "Say Hi to 5 People",
        description: "Say hi to five people you don't normally talk to.",
        xp: 35,
        sport: null
    },

    {
        id: "compliment",
        category: "Comfort Zone",
        icon: "💬",
        title: "Give a Genuine Compliment",
        description: "Give someone a real, thoughtful compliment.",
        xp: 30,
        sport: null
    },

    {
        id: "new-conversation",
        category: "Comfort Zone",
        icon: "🗣️",
        title: "Talk to Someone New",
        description: "Start a conversation with someone you don't normally talk to.",
        xp: 45,
        sport: null
    },

    {
        id: "thank-someone",
        category: "Comfort Zone",
        icon: "🙏",
        title: "Thank Someone",
        description: "Tell someone specifically why you appreciate them.",
        xp: 30,
        sport: null
    },

    {
        id: "ask-feedback",
        category: "Mindset",
        icon: "🧠",
        title: "Ask for Feedback",
        description: "Ask someone you trust for honest feedback.",
        xp: 45,
        sport: null
    },

    {
        id: "do-the-thing",
        category: "Mindset",
        icon: "⚡",
        title: "Do the Thing",
        description: "Finish one thing you've been putting off.",
        xp: 40,
        sport: null
    },


    /* ---------------------------------------------
       BASEBALL
    --------------------------------------------- */

    {
        id: "baseball-tee-50",
        category: "Baseball",
        icon: "⚾",
        title: "50 Tee Swings",
        description: "Take 50 quality tee swings.",
        xp: 35,
        sport: "baseball"
    },

    {
        id: "baseball-tee-100",
        category: "Baseball",
        icon: "⚾",
        title: "100 Tee Swings",
        description: "Take 100 quality tee swings.",
        xp: 55,
        sport: "baseball"
    },

    {
        id: "baseball-oppo-25",
        category: "Baseball",
        icon: "⚾",
        title: "25 Opposite-Field Swings",
        description: "Take 25 focused opposite-field swings.",
        xp: 45,
        sport: "baseball"
    },

    {
        id: "baseball-grounders-50",
        category: "Baseball",
        icon: "🧤",
        title: "50 Ground Balls",
        description: "Complete 50 clean fielding reps.",
        xp: 45,
        sport: "baseball"
    },

    {
        id: "baseball-backhands-25",
        category: "Baseball",
        icon: "🧤",
        title: "25 Backhand Reps",
        description: "Complete 25 quality backhand reps.",
        xp: 35,
        sport: "baseball"
    },

    {
        id: "baseball-throws-30",
        category: "Baseball",
        icon: "⚾",
        title: "30 Accurate Throws",
        description: "Complete 30 accurate throwing reps.",
        xp: 35,
        sport: "baseball"
    },

    {
        id: "baseball-short-hops",
        category: "Baseball",
        icon: "🧤",
        title: "25 Short-Hop Reps",
        description: "Work through 25 short-hop fielding reps.",
        xp: 40,
        sport: "baseball"
    },

    {
        id: "baseball-two-strike",
        category: "Baseball",
        icon: "⚾",
        title: "30 Two-Strike Swings",
        description: "Take 30 competitive two-strike swings.",
        xp: 45,
        sport: "baseball"
    },


    /* ---------------------------------------------
       LACROSSE
    --------------------------------------------- */

    {
        id: "lax-wall-100",
        category: "Lacrosse",
        icon: "🥍",
        title: "100 Wall Balls",
        description: "Complete 100 wall-ball reps.",
        xp: 45,
        sport: "lacrosse"
    },

    {
        id: "lax-right-50",
        category: "Lacrosse",
        icon: "🥍",
        title: "50 Right-Hand Passes",
        description: "Complete 50 right-hand passing reps.",
        xp: 35,
        sport: "lacrosse"
    },

    {
        id: "lax-left-50",
        category: "Lacrosse",
        icon: "🥍",
        title: "50 Left-Hand Passes",
        description: "Complete 50 left-hand passing reps.",
        xp: 35,
        sport: "lacrosse"
    },

    {
        id: "lax-ground-25",
        category: "Lacrosse",
        icon: "🥍",
        title: "25 Ground Balls",
        description: "Complete 25 clean ground-ball pickups.",
        xp: 35,
        sport: "lacrosse"
    },

    {
        id: "lax-shots-30",
        category: "Lacrosse",
        icon: "🥍",
        title: "30 Shots",
        description: "Take 30 focused shots.",
        xp: 45,
        sport: "lacrosse"
    },

    {
        id: "lax-dodges-20",
        category: "Lacrosse",
        icon: "🥍",
        title: "20 Dodges",
        description: "Complete 20 focused dodge reps.",
        xp: 40,
        sport: "lacrosse"
    },


    /* ---------------------------------------------
       BASKETBALL
    --------------------------------------------- */

    {
        id: "basketball-shots-50",
        category: "Basketball",
        icon: "🏀",
        title: "50 Shots",
        description: "Complete 50 focused shooting reps.",
        xp: 40,
        sport: "basketball"
    },

    {
        id: "basketball-ft-25",
        category: "Basketball",
        icon: "🏀",
        title: "25 Free Throws",
        description: "Take 25 focused free throws.",
        xp: 30,
        sport: "basketball"
    },

    {
        id: "basketball-handles",
        category: "Basketball",
        icon: "🏀",
        title: "10-Minute Handles",
        description: "Work on ball handling for 10 minutes.",
        xp: 30,
        sport: "basketball"
    },


    /* ---------------------------------------------
       SOCCER
    --------------------------------------------- */

    {
        id: "soccer-passes-100",
        category: "Soccer",
        icon: "⚽",
        title: "100 Passes",
        description: "Complete 100 controlled passing reps.",
        xp: 40,
        sport: "soccer"
    },

    {
        id: "soccer-juggle-50",
        category: "Soccer",
        icon: "⚽",
        title: "50 Juggles",
        description: "Reach 50 total juggling touches.",
        xp: 35,
        sport: "soccer"
    },

    {
        id: "soccer-dribble-20",
        category: "Soccer",
        icon: "⚽",
        title: "20 Dribbling Reps",
        description: "Complete 20 focused dribbling reps.",
        xp: 35,
        sport: "soccer"
    },


    /* ---------------------------------------------
       FOOTBALL
    --------------------------------------------- */

    {
        id: "football-routes-25",
        category: "Football",
        icon: "🏈",
        title: "25 Route Reps",
        description: "Run 25 quality route reps.",
        xp: 40,
        sport: "football"
    },

    {
        id: "football-catches-50",
        category: "Football",
        icon: "🏈",
        title: "50 Catches",
        description: "Complete 50 receiving reps.",
        xp: 45,
        sport: "football"
    },

    {
        id: "football-footwork",
        category: "Football",
        icon: "🏈",
        title: "15-Minute Footwork",
        description: "Work on football footwork for 15 minutes.",
        xp: 35,
        sport: "football"
    },


    /* ---------------------------------------------
       GROWTH
    --------------------------------------------- */

    {
        id: "read-15",
        category: "Growth",
        icon: "📖",
        title: "Read for 15 Minutes",
        description: "Read something useful or interesting.",
        xp: 25,
        sport: null
    },

    {
        id: "clean-10",
        category: "Growth",
        icon: "🧹",
        title: "10-Minute Reset",
        description: "Clean or organize something you've been ignoring.",
        xp: 25,
        sport: null
    },

    {
        id: "plan-tomorrow",
        category: "Growth",
        icon: "📝",
        title: "Plan Tomorrow",
        description: "Spend five minutes planning your next day.",
        xp: 25,
        sport: null
    },

    {
        id: "sleep-priority",
        category: "Recovery",
        icon: "😴",
        title: "Prioritize Your Sleep",
        description: "Make tonight about getting quality sleep.",
        xp: 35,
        sport: null
    }

];


/* =====================================================
   DATE HELPERS
===================================================== */

function todayKey() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function dateDifference(dateA, dateB) {

    const a =
        new Date(`${dateA}T00:00:00`);

    const b =
        new Date(`${dateB}T00:00:00`);

    return Math.round(
        (b - a) /
        (1000 * 60 * 60 * 24)
    );

}


/* =====================================================
   SAVE
===================================================== */

function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =====================================================
   MISSION LOOKUP
===================================================== */

function findMission(id) {

    return MISSIONS.find(
        mission => mission.id === id
    );

}


/* =====================================================
   COMPLETION CHECK
===================================================== */

function completedToday(id) {

    const today =
        todayKey();

    return data.completedMissions.some(
        completion =>
            completion.id === id &&
            completion.date === today
    );

}


/* =====================================================
   RECENT MISSION IDS
===================================================== */

function getRecentMissionIds() {

    const cutoff =
        new Date();

    cutoff.setDate(
        cutoff.getDate() - 7
    );

    return data.completedMissions

        .filter(item => {

            const date =
                new Date(
                    `${item.date}T00:00:00`
                );

            return date >= cutoff;

        })

        .map(item => item.id);

}


/* =====================================================
   RANDOM ITEM
===================================================== */

function randomItem(array) {

    if (!array.length) {

        return null;

    }

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =====================================================
   UNIQUE RANDOM MISSION SET
===================================================== */

function createDailyMissions() {

    const recentIds =
        getRecentMissionIds();


    const available =
        MISSIONS.filter(
            mission =>
                !recentIds.includes(
                    mission.id
                )
        );


    const selected = [];


    /*
       First try to give the user
       one sport-specific mission.
    */

    const sportPool =
        available.filter(
            mission =>
                mission.sport === data.sport
        );


    if (sportPool.length) {

        const mission =
            randomItem(sportPool);

        selected.push(mission);

    }


    /*
       Try to include a comfort-zone
       challenge.
    */

    const comfortPool =
        available.filter(
            mission =>
                mission.category ===
                "Comfort Zone" &&
                !selected.some(
                    selectedMission =>
                        selectedMission.id ===
                        mission.id
                )
        );


    if (comfortPool.length) {

        const mission =
            randomItem(comfortPool);

        selected.push(mission);

    }


    /*
       Fill remaining spots randomly.
       NEVER allow duplicate IDs.
    */

    while (selected.length < 4) {

        const remaining =
            available.filter(
                mission =>
                    !selected.some(
                        selectedMission =>
                            selectedMission.id ===
                            mission.id
                    )
            );


        if (!remaining.length) {

            break;

        }


        selected.push(
            randomItem(remaining)
        );

    }


    return selected.map(
        mission => mission.id
    );

}


/* =====================================================
   GET TODAY'S MISSIONS
===================================================== */

function getTodayMissions() {

    const today =
        todayKey();


    /*
       IMPORTANT:
       If today's missions already exist,
       DO NOT generate new ones.
       This is what prevents refresh
       from changing or duplicating missions.
    */

    if (
        data.dailyMissionDate === today &&
        Array.isArray(data.dailyMissionIds) &&
        data.dailyMissionIds.length
    ) {

        return data.dailyMissionIds
            .map(findMission)
            .filter(Boolean);

    }


    const ids =
        createDailyMissions();


    data.dailyMissionDate =
        today;

    data.dailyMissionIds =
        ids;

    data.dailySwapUsed =
        false;


    saveData();


    return ids
        .map(findMission)
        .filter(Boolean);

}


/* =====================================================
   LEVEL SYSTEM
===================================================== */

function levelGoal(level) {

    /*
       Level 1 = 100 XP
       Level 2 = 150 XP
       Level 3 = 200 XP
       Level 4 = 250 XP
       etc.
    */

    return 100 + (
        (level - 1) * 50
    );

}


function calculateLevel() {

    let level = 1;

    let remainingXP =
        data.xp;


    while (
        remainingXP >=
        levelGoal(level)
    ) {

        remainingXP -=
            levelGoal(level);

        level++;

    }


    return {

        level,

        currentXP:
            remainingXP,

        goal:
            levelGoal(level)

    };

}


/* =====================================================
   REFRESH LEVEL
===================================================== */

function refreshLevel() {

    const result =
        calculateLevel();


    if (
        result.level >
        data.level
    ) {

        showToast(
            `🎉 Level ${result.level}!`
        );

    }


    data.level =
        result.level;

    saveData();

}


/* =====================================================
   ADD XP
===================================================== */

function addXP(amount) {

    data.xp += amount;

    refreshLevel();

}


/* =====================================================
   STREAK
===================================================== */

function updateStreak() {

    const today =
        todayKey();


    if (
        data.lastMissionDate ===
        today
    ) {

        return;

    }


    if (!data.lastMissionDate) {

        data.currentStreak = 1;

    } else {

        const difference =
            dateDifference(
                data.lastMissionDate,
                today
            );


        if (difference === 1) {

            data.currentStreak++;

        } else {

            data.currentStreak = 1;

        }

    }


    data.lastMissionDate =
        today;


    data.longestStreak =
        Math.max(
            data.longestStreak,
            data.currentStreak
        );


    markTodayTracked();

}


/* =====================================================
   TRACK DAY
===================================================== */

function markTodayTracked() {

    const today =
        todayKey();


    if (
        !data.trackedDays.includes(
            today
        )
    ) {

        data.trackedDays.push(
            today
        );

    }

}


/* =====================================================
   COMPLETE DAILY MISSION
===================================================== */

function completeMission(id) {

    const mission =
        findMission(id);


    if (!mission) {

        return;

    }


    /*
       HARD DUPLICATE PROTECTION:
       A mission ID can only award XP once
       per calendar day.
    */

    if (
        completedToday(id)
    ) {

        showToast(
            "You already completed this mission today."
        );

        return;

    }


    data.completedMissions.push({

        id: id,

        date: todayKey(),

        source: "daily"

    });


    data.lifetimeMissions++;


    addXP(
        mission.xp
    );


    updateStreak();


    saveData();


    showToast(
        `+${mission.xp} XP earned!`
    );


    renderAll();

}


/* =====================================================
   SWAP MISSION
===================================================== */

function swapMission() {

    if (
        data.dailySwapUsed
    ) {

        showToast(
            "You've already used your swap today."
        );

        return;

    }


    const current =
        getTodayMissions();


    if (!current.length) {

        return;

    }


    const recentIds =
        getRecentMissionIds();


    const replacementPool =
        MISSIONS.filter(
            mission =>
                !recentIds.includes(
                    mission.id
                ) &&
                !current.some(
                    currentMission =>
                        currentMission.id ===
                        mission.id
                )
        );


    if (
        !replacementPool.length
    ) {

        showToast(
            "No replacement mission available."
        );

        return;

    }


    const replacement =
        randomItem(
            replacementPool
        );


    const replaceIndex =
        Math.floor(
            Math.random() *
            data.dailyMissionIds.length
        );


    data.dailyMissionIds[
        replaceIndex
    ] = replacement.id;


    data.dailySwapUsed =
        true;


    saveData();


    renderMissions();


    showToast(
        "Mission swapped!"
    );

}


/* =====================================================
   MYSTERY CHALLENGE
===================================================== */

function setupMystery() {

    const today =
        todayKey();


    if (
        data.mysteryDate === today &&
        data.mysteryId
    ) {

        return;

    }


    const recentIds =
        getRecentMissionIds();


    const dailyIds =
        data.dailyMissionIds;


    const pool =
        MISSIONS.filter(
            mission =>
                !recentIds.includes(
                    mission.id
                ) &&
                !dailyIds.includes(
                    mission.id
                )
        );


    const mission =
        randomItem(pool);


    if (!mission) {

        return;

    }


    data.mysteryDate =
        today;

    data.mysteryId =
        mission.id;

    data.mysteryCompleted =
        false;


    saveData();

}


/* =====================================================
   COMPLETE MYSTERY
===================================================== */

function completeMystery() {

    setupMystery();


    if (
        data.mysteryCompleted
    ) {

        showToast(
            "Mystery challenge already completed."
        );

        return;

    }


    const mission =
        findMission(
            data.mysteryId
        );


    if (!mission) {

        return;

    }


    /*
       Prevent the mystery from awarding
       XP if its mission has somehow
       already been completed today.
    */

    if (
        completedToday(
            mission.id
        )
    ) {

        data.mysteryCompleted =
            true;

        saveData();

        showToast(
            "That challenge was already completed today."
        );

        renderAll();

        return;

    }


    data.completedMissions.push({

        id: mission.id,

        date: todayKey(),

        source: "mystery"

    });


    data.mysteryCompleted =
        true;


    data.lifetimeMissions++;


    addXP(
        mission.xp
    );


    updateStreak();


    saveData();


    showToast(
        `Mystery complete! +${mission.xp} XP`
    );


    renderAll();

}


/* =====================================================
   SPORT
===================================================== */

const SPORT_DESCRIPTIONS = {

    general:
        "A mix of fitness, recovery, mindset, and athletic challenges.",

    baseball:
        "Hitting, fielding, throwing, and baseball skill work.",

    lacrosse:
        "Passing, shooting, dodging, ground balls, and stick work.",

    basketball:
        "Shooting, free throws, ball handling, and basketball skill work.",

    soccer:
        "Passing, juggling, dribbling, and technical work.",

    football:
        "Routes, catching, footwork, and football skill work."

};


function setSport(sport) {

    data.sport =
        sport;


    /*
       Changing sport creates a new
       daily mission rotation.
    */

    data.dailyMissionDate =
        null;


    saveData();


    renderAll();


    showToast(
        `${capitalize(sport)} selected.`
    );

}


function capitalize(text) {

    return text
        .charAt(0)
        .toUpperCase() +
        text.slice(1);

}


/* =====================================================
   FOOD TOTALS
===================================================== */

function getFoodTotals() {

    let calories = 0;

    let protein = 0;


    for (
        const meal of
        Object.values(data.food)
    ) {

        for (
            const item of meal
        ) {

            calories +=
                Number(
                    item.calories
                ) || 0;

            protein +=
                Number(
                    item.protein
                ) || 0;

        }

    }


    return {

        calories,

        protein

    };

}


/* =====================================================
   ADD FOOD
===================================================== */

function addFood(meal) {

    const name =
        prompt(
            "What food did you eat?"
        );


    if (!name) {

        return;

    }


    const calories =
        Number(
            prompt(
                "How many calories?"
            )
        );


    const protein =
        Number(
            prompt(
                "How many grams of protein?"
            )
        );


    if (
        Number.isNaN(calories) ||
        Number.isNaN(protein)
    ) {

        showToast(
            "Please enter valid numbers."
        );

        return;

    }


    data.food[meal].push({

        name,

        calories,

        protein

    });


    data.calorieLifetime +=
        calories;


    data.proteinLifetime +=
        protein;


    markTodayTracked();


    saveData();


    renderAll();


    showToast(
        "Food added!"
    );

}


/* =====================================================
   DELETE FOOD
===================================================== */

function deleteFood(
    meal,
    index
) {

    const item =
        data.food[meal][index];


    if (!item) {

        return;

    }


    data.calorieLifetime -=
        Number(
            item.calories
        ) || 0;


    data.proteinLifetime -=
        Number(
            item.protein
        ) || 0;


    data.food[meal].splice(
        index,
        1
    );


    saveData();


    renderAll();

}


/* =====================================================
   PROTEIN GOAL
===================================================== */

function saveProteinGoal() {

    const value =
        Number(
            document.getElementById(
                "proteinGoal"
            ).value
        );


    if (
        Number.isNaN(value) ||
        value < 0
    ) {

        return;

    }


    data.proteinGoal =
        value;


    saveData();


    renderNutrition();


    showToast(
        "Protein goal saved."
    );

}


/* =====================================================
   WATER
===================================================== */

function addWater(amount) {

    const today =
        todayKey();


    if (
        !data.waterByDate[today]
    ) {

        data.waterByDate[today] =
            0;

    }


    data.waterByDate[today] +=
        amount;


    data.waterLifetime +=
        amount;


    markTodayTracked();


    saveData();


    renderAll();


    showToast(
        `+${amount} fl oz`
    );

}


/* =====================================================
   WATER GOAL
===================================================== */

function saveWaterGoal() {

    const value =
        Number(
            document.getElementById(
                "waterGoal"
            ).value
        );


    if (
        Number.isNaN(value) ||
        value < 0
    ) {

        return;

    }


    data.waterGoal =
        value;


    saveData();


    renderHydration();


    showToast(
        "Water goal saved."
    );

}


/* =====================================================
   SLEEP
===================================================== */

function saveSleep() {

    const value =
        Number(
            document.getElementById(
                "sleepInput"
            ).value
        );


    if (
        Number.isNaN(value) ||
        value < 0 ||
        value > 24
    ) {

        showToast(
            "Enter a number between 0 and 24."
        );

        return;

    }


    data.sleepByDate[
        todayKey()
    ] = value;


    markTodayTracked();


    saveData();


    renderHomeStats();


    showToast(
        "Sleep saved."
    );

}


/* =====================================================
   HOME RENDER
===================================================== */

function renderHome() {

    const result =
        calculateLevel();


    document.getElementById(
        "homeLevel"
    ).textContent =
        result.level;


    document.getElementById(
        "homeXP"
    ).textContent =
        `${result.currentXP} / ${result.goal} XP`;


    document.getElementById(
        "homeXPRemaining"
    ).textContent =
        `${result.goal - result.currentXP} XP to next level`;


    document.getElementById(
        "homeStreak"
    ).textContent =
        `🔥 ${data.currentStreak} day streak`;


    const percentage =
        result.goal === 0
            ? 0
            : (
                result.currentXP /
                result.goal
            ) * 100;


    document.getElementById(
        "homeXPBar"
    ).style.width =
        `${Math.min(100, percentage)}%`;


    renderMissions();


    renderMystery();


    renderHomeStats();

}


/* =====================================================
   RENDER MISSIONS
===================================================== */

function renderMissions() {

    const container =
        document.getElementById(
            "missionList"
        );


    const missions =
        getTodayMissions();


    container.innerHTML =
        missions.map(
            mission => {

                const completed =
                    completedToday(
                        mission.id
                    );


                return `

                    <div
                        class="
                            mission-card
                            ${completed
                                ? "completed"
                                : ""}
                        "
                    >

                        <div>

                            <div
                                class="mission-top"
                            >

                                <span
                                    class="mission-icon"
                                >
                                    ${mission.icon}
                                </span>

                                <span
                                    class="mission-category"
                                >
                                    ${mission.category}
                                </span>

                            </div>


                            <h3>
                                ${mission.title}
                            </h3>


                            <p>
                                ${mission.description}
                            </p>

                        </div>


                        <div
                            class="mission-footer"
                        >

                            <span
                                class="mission-xp"
                            >
                                +${mission.xp} XP
                            </span>


                            <button
                                class="
                                    complete-button
                                    ${completed
                                        ? "completed-button"
                                        : ""}
                                "
                                data-complete-mission="${mission.id}"
                                type="button"
                                ${completed
                                    ? "disabled"
                                    : ""}
                            >
                                ${
                                    completed
                                        ? "✓ Complete"
                                        : "Complete"
                                }
                            </button>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =====================================================
   RENDER MYSTERY
===================================================== */

function renderMystery() {

    setupMystery();


    const container =
        document.getElementById(
            "mysteryCard"
        );


    const mission =
        findMission(
            data.mysteryId
        );


    if (!mission) {

        return;

    }


    if (
        data.mysteryRevealed !== true
    ) {

        container.innerHTML = `

            <div class="mystery-icon">
                ?
            </div>


            <div class="mystery-content">

                <h3>
                    Mystery Challenge
                </h3>

                <p>
                    You don't know what it is yet.
                    Reveal it when you're ready.
                </p>

            </div>


            <button
                id="revealMysteryButton"
                class="primary-button"
                type="button"
            >
                Reveal
            </button>

        `;


        return;

    }


    const alreadyCompleted =
        data.mysteryCompleted ||
        completedToday(
            mission.id
        );


    container.innerHTML = `

        <div class="mystery-icon">
            ${mission.icon}
        </div>


        <div class="mystery-content">

            <h3>
                ${mission.title}
            </h3>

            <p>
                ${mission.description}
                · +${mission.xp} XP
            </p>

        </div>


        <button
            id="completeMysteryButton"
            class="primary-button"
            type="button"
            ${alreadyCompleted
                ? "disabled"
                : ""}
        >
            ${
                alreadyCompleted
                    ? "✓ Done"
                    : "Complete"
            }
        </button>

    `;

}


/* =====================================================
   REVEAL MYSTERY
===================================================== */

function revealMystery() {

    setupMystery();


    data.mysteryRevealed =
        true;


    saveData();


    renderMystery();


    showToast(
        "Mystery revealed!"
    );

}


/* =====================================================
   RENDER HOME STATS
===================================================== */

function renderHomeStats() {

    const totals =
        getFoodTotals();


    const today =
        todayKey();


    const water =
        data.waterByDate[today] || 0;


    const sleep =
        data.sleepByDate[today] || 0;


    document.getElementById(
        "homeProtein"
    ).textContent =
        `${Math.round(
            totals.protein
        )}g`;


    document.getElementById(
        "homeCalories"
    ).textContent =
        Math.round(
            totals.calories
        );


    document.getElementById(
        "homeWater"
    ).textContent =
        `${water} fl oz`;


    document.getElementById(
        "homeSleep"
    ).textContent =
        `${sleep}h`;

}


/* =====================================================
   RENDER TRAINING
===================================================== */

function renderTraining() {

    const sport =
        data.sport;


    document.getElementById(
        "currentSport"
    ).textContent =
        capitalize(
            sport
        );


    document.getElementById(
        "sportDescription"
    ).textContent =
        SPORT_DESCRIPTIONS[
            sport
        ];


    document
        .querySelectorAll(
            ".sport-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "selected",
                    button.dataset.sport ===
                    sport
                );

            }
        );


    let training;


    if (
        sport === "general"
    ) {

        training =
            MISSIONS.filter(
                mission =>
                    mission.sport === null
            );

    } else {

        training =
            MISSIONS.filter(
                mission =>
                    mission.sport ===
                    sport
            );

    }


    const container =
        document.getElementById(
            "trainingList"
        );


    container.innerHTML =
        training.map(
            mission => `

                <div
                    class="training-item"
                >

                    <strong>
                        ${mission.icon}
                        ${mission.title}
                    </strong>

                    <span>
                        ${mission.description}
                        · +${mission.xp} XP
                    </span>

                </div>

            `
        ).join("");

}


/* =====================================================
   RENDER NUTRITION
===================================================== */

function renderNutrition() {

    const totals =
        getFoodTotals();


    document.getElementById(
        "proteinTotal"
    ).textContent =
        Math.round(
            totals.protein
        );


    document.getElementById(
        "nutritionProteinTotal"
    ).textContent =
        `${Math.round(
            totals.protein
        )}g`;


    document.getElementById(
        "calorieTotal"
    ).textContent =
        Math.round(
            totals.calories
        );


    document.getElementById(
        "proteinGoal"
    ).value =
        data.proteinGoal;


    const goal =
        Number(
            data.proteinGoal
        ) || 1;


    const percent =
        Math.min(
            100,
            Math.round(
                (
                    totals.protein /
                    goal
                ) * 100
            )
        );


    document.getElementById(
        "proteinPercent"
    ).textContent =
        `${percent}%`;


    const meals = [
        "breakfast",
        "lunch",
        "dinner",
        "snacks"
    ];


    meals.forEach(
        meal => {

            const items =
                data.food[meal];


            let calories = 0;

            let protein = 0;


            items.forEach(
                item => {

                    calories +=
                        Number(
                            item.calories
                        ) || 0;

                    protein +=
                        Number(
                            item.protein
                        ) || 0;

                }
            );


            document.getElementById(
                `${meal}Total`
            ).textContent =
                `${calories} cal · ${protein}g protein`;


            const container =
                document.getElementById(
                    `${meal}Items`
                );


            container.innerHTML =
                items.map(
                    (item, index) => `

                        <div
                            class="food-item"
                        >

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        item.name
                                    )}
                                </strong>

                                <small>
                                    ${item.calories}
                                    cal ·
                                    ${item.protein}
                                    g protein
                                </small>

                            </div>


                            <button
                                class="delete-food"
                                data-delete-meal="${meal}"
                                data-delete-index="${index}"
                                type="button"
                            >
                                ×
                            </button>

                        </div>

                    `
                ).join("");

        }
    );

}


/* =====================================================
   RENDER WATER
===================================================== */

function renderHydration() {

    const today =
        todayKey();


    const amount =
        data.waterByDate[today] || 0;


    const goal =
        Number(
            data.waterGoal
        ) || 1;


    document.getElementById(
        "waterTotal"
    ).textContent =
        amount;


    document.getElementById(
        "waterGoalText"
    ).textContent =
        data.waterGoal;


    document.getElementById(
        "waterGoal"
    ).value =
        data.waterGoal;


    const percent =
        Math.min(
            100,
            (
                amount /
                goal
            ) * 100
        );


    document.getElementById(
        "waterBar"
    ).style.width =
        `${percent}%`;


    document.getElementById(
        "sleepInput"
    ).value =
        data.sleepByDate[today] || "";

}


/* =====================================================
   RENDER PROGRESS
===================================================== */

function renderProgress() {

    const result =
        calculateLevel();


    document.getElementById(
        "progressLevel"
    ).textContent =
        result.level;


    document.getElementById(
        "progressXP"
    ).textContent =
        `${result.currentXP} / ${result.goal} XP`;


    const percent =
        (
            result.currentXP /
            result.goal
        ) * 100;


    document.getElementById(
        "progressXPBar"
    ).style.width =
        `${Math.min(
            100,
            percent
        )}%`;


    document.getElementById(
        "lifetimeMissions"
    ).textContent =
        data.lifetimeMissions;


    document.getElementById(
        "lifetimeStreak"
    ).textContent =
        data.longestStreak;


    document.getElementById(
        "lifetimeCalories"
    ).textContent =
        Math.round(
            data.calorieLifetime
        );


    document.getElementById(
        "lifetimeProtein"
    ).textContent =
        `${Math.round(
            data.proteinLifetime
        )}g`;


    document.getElementById(
        "lifetimeWater"
    ).textContent =
        Math.round(
            data.waterLifetime
        );


    document.getElementById(
        "lifetimeDays"
    ).textContent =
        data.trackedDays.length;


    renderAchievements();

}


/* =====================================================
   ACHIEVEMENTS
===================================================== */

function renderAchievements() {

    const baseballCompleted =
        data.completedMissions.filter(
            item => {

                const mission =
                    findMission(
                        item.id
                    );

                return (
                    mission &&
                    mission.sport ===
                    "baseball"
                );

            }
        ).length;


    const lacrosseCompleted =
        data.completedMissions.filter(
            item => {

                const mission =
                    findMission(
                        item.id
                    );

                return (
                    mission &&
                    mission.sport ===
                    "lacrosse"
                );

            }
        ).length;


    const comfortCompleted =
        data.completedMissions.filter(
            item => {

                const mission =
                    findMission(
                        item.id
                    );

                return (
                    mission &&
                    mission.category ===
                    "Comfort Zone"
                );

            }
        ).length;


    const waterGoalDays =
        Object.values(
            data.waterByDate
        ).filter(
            amount =>
                amount >=
                data.waterGoal
        ).length;


    const achievements = [

        {
            icon: "🚀",
            title: "First Step",
            description: "Complete your first mission.",
            unlocked:
                data.lifetimeMissions >= 1
        },

        {
            icon: "🔥",
            title: "7-Day Streak",
            description: "Reach a 7-day streak.",
            unlocked:
                data.longestStreak >= 7
        },

        {
            icon: "💯",
            title: "Century",
            description: "Complete 100 missions.",
            unlocked:
                data.lifetimeMissions >= 100
        },

        {
            icon: "⚾",
            title: "Ballplayer",
            description: "Complete 25 baseball missions.",
            unlocked:
                baseballCompleted >= 25
        },

        {
            icon: "🥍",
            title: "Lax Grind",
            description: "Complete 25 lacrosse missions.",
            unlocked:
                lacrosseCompleted >= 25
        },

        {
            icon: "💧",
            title: "Hydrated",
            description: "Hit your water goal 10 times.",
            unlocked:
                waterGoalDays >= 10
        },

        {
            icon: "🗣️",
            title: "Out of Your Shell",
            description: "Complete 10 comfort-zone missions.",
            unlocked:
                comfortCompleted >= 10
        },

        {
            icon: "🌟",
            title: "Level 10",
            description: "Reach Level 10.",
            unlocked:
                data.level >= 10
        },

        {
            icon: "📅",
            title: "One Year",
            description: "Track 365 days.",
            unlocked:
                data.trackedDays.length >= 365
        }

    ];


    const container =
        document.getElementById(
            "achievementList"
        );


    container.innerHTML =
        achievements.map(
            achievement => `

                <div
                    class="
                        achievement
                        ${
                            achievement.unlocked
                                ? "unlocked"
                                : ""
                        }
                    "
                >

                    <div
                        class="achievement-icon"
                    >
                        ${achievement.icon}
                    </div>

                    <strong>
                        ${achievement.title}
                    </strong>

                    <span>
                        ${achievement.description}
                    </span>

                </div>

            `
        ).join("");

}


/* =====================================================
   SETTINGS
===================================================== */

function renderSettings() {

    document.getElementById(
        "userName"
    ).value =
        data.name || "";


    document.getElementById(
        "sportSelect"
    ).value =
        data.sport || "general";

}


/* =====================================================
   SAVE SETTINGS
===================================================== */

function saveSettings() {

    data.name =
        document.getElementById(
            "userName"
        ).value.trim();


    const newSport =
        document.getElementById(
            "sportSelect"
        ).value;


    if (
        newSport !==
        data.sport
    ) {

        data.sport =
            newSport;

        data.dailyMissionDate =
            null;

    }


    saveData();


    renderAll();


    showToast(
        "Settings saved!"
    );

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(page) {

    document
        .querySelectorAll(
            ".page"
        )
        .forEach(
            element => {

                element.classList.remove(
                    "active"
                );

            }
        );


    const target =
        document.getElementById(
            `page-${page}`
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    document
        .querySelectorAll(
            ".nav-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.page ===
                    page
                );

            }
        );


    if (
        page ===
        "settings"
    ) {

        renderSettings();

    }


    renderAll();

}


/* =====================================================
   TOAST
===================================================== */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   RESET APP
===================================================== */

function resetApp() {

    const confirmed =
        confirm(
            "This will permanently erase all LevelUp progress. Continue?"
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        STORAGE_KEY
    );


    data =
        structuredClone(
            DEFAULT_DATA
        );


    renderAll();


    showToast(
        "App reset."
    );

}


/* =====================================================
   EVENT LISTENERS
===================================================== */

function setupEventListeners() {


    /* ---------------------------------------------
       NAVIGATION
    --------------------------------------------- */

    document
        .querySelectorAll(
            ".nav-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        showPage(
                            button.dataset.page
                        );

                    }
                );

            }
        );


    /* ---------------------------------------------
       SETTINGS
    --------------------------------------------- */

    document
        .getElementById(
            "settingsButton"
        )
        .addEventListener(
            "click",
            () => {

                showPage(
                    "settings"
                );

            }
        );


    document
        .getElementById(
            "saveSettings"
        )
        .addEventListener(
            "click",
            saveSettings
        );


    document
        .getElementById(
            "resetApp"
        )
        .addEventListener(
            "click",
            resetApp
        );


    /* ---------------------------------------------
       MISSION SWAP
    --------------------------------------------- */

    document
        .getElementById(
            "swapMissionButton"
        )
        .addEventListener(
            "click",
            swapMission
        );


    /* ---------------------------------------------
       MISSION COMPLETION
    --------------------------------------------- */

    document
        .getElementById(
            "missionList"
        )
        .addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-complete-mission]"
                    );


                if (!button) {

                    return;

                }


                completeMission(
                    button.dataset
                        .completeMission
                );

            }
        );


    /* ---------------------------------------------
       MYSTERY REVEAL / COMPLETE
    --------------------------------------------- */

    document
        .getElementById(
            "mysteryCard"
        )
        .addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "revealMysteryButton"
                ) {

                    revealMystery();

                    return;

                }


                if (
                    event.target.id ===
                    "completeMysteryButton"
                ) {

                    completeMystery();

                }

            }
        );


    /* ---------------------------------------------
       SPORT BUTTONS
    --------------------------------------------- */

    document
        .querySelectorAll(
            ".sport-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        setSport(
                            button.dataset.sport
                        );

                    }
                );

            }
        );


    /* ---------------------------------------------
       FOOD
    --------------------------------------------- */

    document
        .querySelectorAll(
            ".add-food-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        addFood(
                            button.dataset.meal
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".meal-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    event => {

                        const button =
                            event.target.closest(
                                "[data-delete-meal]"
                            );


                        if (!button) {

                            return;

                        }


                        deleteFood(

                            button.dataset
                                .deleteMeal,

                            Number(
                                button.dataset
                                    .deleteIndex
                            )

                        );

                    }
                );

            }
        );


    document
        .getElementById(
            "saveProteinGoal"
        )
        .addEventListener(
            "click",
            saveProteinGoal
        );


    /* ---------------------------------------------
       WATER
    --------------------------------------------- */

    document
        .querySelectorAll(
            "[data-water]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        addWater(
                            Number(
                                button.dataset.water
                            )
                        );

                    }
                );

            }
        );


    document
        .getElementById(
            "saveWaterGoal"
        )
        .addEventListener(
            "click",
            saveWaterGoal
        );


    /* ---------------------------------------------
       SLEEP
    --------------------------------------------- */

    document
        .getElementById(
            "saveSleep"
        )
        .addEventListener(
            "click",
            saveSleep
        );

}


/* =====================================================
   RENDER EVERYTHING
===================================================== */

function renderAll() {

    refreshLevel();

    renderHome();

    renderTraining();

    renderNutrition();

    renderHydration();

    renderProgress();

    renderSettings();

    saveData();

}


/* =====================================================
   START APPLICATION
===================================================== */

setupEventListeners();

renderAll();
