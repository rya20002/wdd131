// =========================
// Navigation
// =========================
const menuButton = document.querySelector("#menu-button");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

// =========================
// Scripture Generator
// =========================
const quotes = [
  "And it came to pass that we lived afer the manner of happiness (2 Nephi 5:27)",
  "Peace be unto thy soul; thine adversity and thine afflictions shall be but a small moment (D&C 121:7)",
  "Learn of me, and listen to my words; walk in the meekness of my Spirit, and you shall have peace in me (D&C 12:23)",
  "And the world passeth away, and the lust therof: but he that doeth the will of God abideth for ever (1 John 2:17)",
  "And walk in love, as Christ also hath loved us, and hath given himself for us an offering and a sacrifice to God for a sweetsmelling savour (Ephesians 5:2)",
  "If any man will come after me, let him deny himself and take up his cross , and follow me (Matthew 16:24)"
];

const quoteText = document.querySelector("#quote-text");
const newQuoteBtn = document.querySelector("#new-quote-btn");

function displayRandomQuote() {
  if (!quoteText) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
}

if (newQuoteBtn) {
  newQuoteBtn.addEventListener("click", displayRandomQuote);
}

// =========================
// Recipes
// =========================
const recipes = [
  {
    name: "Sweet Potato Bowl",
    category: "breakfast",
    time: "10 min",
    description: "Healthy fats and brain power for the day",
    ingredients: ["1 Sweet Potato", "2 Eggs", "4oz Ground Beef", "1 cup Spinach"]
  },
  {
    name: "Overnight Oats",
    category: "breakfast",
    time: "10 min",
    description: "Make ahead of time and its ready to go when you need it, top with fruit of choice",
    ingredients: ["1 cup Greek Yogurt", "2 TBSP Chia Seeds", "15 g Honey", "1/2 cup Oats", "Almond Milk"]
  },
  {
    name: "Pesto Chicken Pasta",
    category: "dinner",
    time: "20 min",
    description: "A classic high protein dinner",
    ingredients: ["4oz Chicken", "2.5 oz Green Lentil Pasta", "1 TBSP Pesto", "1 oz Grated Parmesean"]
  },
  {
    name: "Pretzel Bites",
    category: "snack",
    time: "60 min",
    description: "A take on Auntie Annies Pretzel Bites, Make dough, Quick baking soda bath then bake 450 until golden brown, top as desired",
    ingredients: ["1.5 cups Water", "2.25 TSP Yeast", "1 TSP Salt", "1 TBSP Sugar", "4 cups Flour", "Egg Wash"]
  },
  {
    name: "Dinner Rolls",
    category: "dinner",
    time: "90 min",
    description: "Perfect side to any dish, make dough let rest, shape and rest again, bake 350 for 20 minutes",
    ingredients: ["1.25 cups Water", "1 TBSP Yeast", ".25 cup Salted Butter", ".25 cup Sugar", "1 Egg", "3.5 cups Flour"]
  },
  {
    name: "Chocolate Chip Cookies",
    category: "dessert",
    time: "60 min",
    description: "Best Chocolate Chip Cookies",
    ingredients: ["1 Cup Crisco Butter Flavor", "1/2 cup Butter", "1.33 Cup Sugar", "1.33 Cup Brown Sugar", "4 Eggs", "4 TSP Vanilla", "4.67 cups Flour", "2 TSP Baking Soda", "1/2 TSP Baking Powder", "2 TSP Maldon Sea Salt", "4 cups Chocolate Chips"]
  },
  {
    name: "Orange Rolls",
    category: "dessert",
    time: "120 min",
    description: "Holy Grail of desserts, fill with sugar, orange zest and butter, top with classic orange icing",
    ingredients: ["1/2 Milk", "1/4 cup Sugar", "2.25 TSP Yeast", "4.25 cups Flour", "1/2 cups orange juice", "1/4 cup Butter", "1 Egg", "2 TSP Vanilla", "1 TSP Salt"]
  }
];

const recipeList = document.querySelector("#recipe-list");
const recipeFilter = document.querySelector("#recipe-filter");

function renderRecipes(filter = "all") {
  if (!recipeList) return;

  recipeList.innerHTML = "";

  const filteredRecipes =
    filter === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.category === filter);

  filteredRecipes.forEach((recipe) => {
    const article = document.createElement("article");
    article.className = "recipe-card";

    const ingredientsHTML = recipe.ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("");

    article.innerHTML = `
      <h3>${recipe.name}</h3>
      <div class="meta">
        <span class="pill">${recipe.category}</span>
        <span class="pill">${recipe.time}</span>
      </div>
      <p>${recipe.description}</p>
      <strong>Ingredients:</strong>
      <ul>${ingredientsHTML}</ul>
    `;

    recipeList.appendChild(article);
  });
}

if (recipeFilter) {
  recipeFilter.addEventListener("change", (event) => {
    renderRecipes(event.target.value);
  });
}

// =========================
// Favorite Activities
// =========================
const activities = [
  {
    title: "Going on a walk",
    description: "You have never regretted going for a walk",
    type: "Calm"
  },
  {
    title: "Practice Guitar",
    description: "Find a new song and practice it until you have it down",
    type: "Creative"
  },
  {
    title: "Meal prep",
    description: "Future busy you will thank you",
    type: "Healthy"
  },
  {
    title: "Scripture Study",
    description: "Take a deeper dive into a topic you've been thinking about",
    type: "Spiritual"
  },
  {
    title: "Serve someone",
    description: "Bake someone treats, clean the apartment, write a letter",
    type: "Fun"
  }
];

const activityList = document.querySelector("#activity-list");

function renderActivities() {
  if (!activityList) return;

  activityList.innerHTML = "";

  activities.forEach((activity) => {
    const article = document.createElement("article");
    article.className = "activity-card";

    article.innerHTML = `
      <h3>${activity.title}</h3>
      <span class="pill">${activity.type}</span>
      <p>${activity.description}</p>
    `;

    activityList.appendChild(article);
  });
}

// =========================
// To-Do List
// =========================
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let todos = JSON.parse(localStorage.getItem("planhub-todos")) || [
  { id: 1, text: "Plan meals for the day", completed: false },
  { id: 2, text: "Finish homeowork assignments due", completed: false}
];

function saveTodos() {
  localStorage.setItem("planhub-todos", JSON.stringify(todos));
}

function updateTodoStats() {
  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = todos.length - completed;

  const completedNode = document.querySelector("#todo-completed");
  const remainingNode = document.querySelector("#todo-remaining");

  if (completedNode) completedNode.textContent = completed;
  if (remainingNode) remainingNode.textContent = remaining;
}

function renderTodos() {
  if (!todoList) return;

  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = `<li><span class="item-text">No tasks yet. Add one above.</span></li>`;
    updateTodoStats();
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <span class="item-text">${todo.text}</span>
      <div class="item-actions">
        <button class="action-button" data-id="${todo.id}" data-action="toggle" type="button">
          ${todo.completed ? "Undo" : "Done"}
        </button>
        <button class="remove-button" data-id="${todo.id}" data-action="remove" type="button">
          Delete
        </button>
      </div>
    `;

    todoList.appendChild(li);
  });

  updateTodoStats();
}

function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  const selectedTodo = todos.find((todo) => todo.id === id);

  if (selectedTodo) {
    selectedTodo.completed = !selectedTodo.completed;
  }

  saveTodos();
  renderTodos();
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

if (todoForm) {
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") {
      return;
    }

    addTodo(text);
    todoInput.value = "";
  });
}

if (todoList) {
  todoList.addEventListener("click", (event) => {
    const target = event.target;
    const id = Number(target.dataset.id);
    const action = target.dataset.action;

    if (!id || !action) {
      return;
    }

    if (action === "toggle") {
      toggleTodo(id);
    } else if (action === "remove") {
      removeTodo(id);
    }
  });
}

// =========================
// Custom List
// =========================
const customForm = document.querySelector("#custom-form");
const customInput = document.querySelector("#custom-input");
const customList = document.querySelector("#custom-list");

let customItems = JSON.parse(localStorage.getItem("planhub-custom-list")) || [
  { id: 1, text: "Organize stuff to move out", completed: false },
  { id: 2, text: "Sell unwanted items", completed: false }
];

function saveCustomItems() {
  localStorage.setItem("planhub-custom-list", JSON.stringify(customItems));
}

function updateCustomListStats() {
  const countNode = document.querySelector("#list-count");
  if (countNode) countNode.textContent = customItems.length;
}

function renderCustomItems() {
  if (!customList) return;

  customList.innerHTML = "";

  if (customItems.length === 0) {
    customList.innerHTML = `<li><span class="item-text">No list items yet. Add one above.</span></li>`;
    updateCustomListStats();
    return;
  }

  customItems.forEach((item) => {
    const li = document.createElement("li");
    li.className = item.completed ? "completed" : "";

    li.innerHTML = `
      <span class="item-text">${item.text}</span>
      <div class="item-actions">
        <button class="action-button" data-id="${item.id}" data-action="toggle-custom" type="button">
          ${item.completed ? "Undo" : "Done"}
        </button>
        <button class="remove-button" data-id="${item.id}" data-action="remove-custom" type="button">
          Delete
        </button>
      </div>
    `;

    customList.appendChild(li);
  });

  updateCustomListStats();
}

function addCustomItem(text) {
  const newItem = {
    id: Date.now(),
    text,
    completed: false
  };

  customItems.push(newItem);
  saveCustomItems();
  renderCustomItems();
}

function toggleCustomItem(id) {
  const selectedItem = customItems.find((item) => item.id === id);

  if (selectedItem) {
    selectedItem.completed = !selectedItem.completed;
  }

  saveCustomItems();
  renderCustomItems();
}

function removeCustomItem(id) {
  customItems = customItems.filter((item) => item.id !== id);
  saveCustomItems();
  renderCustomItems();
}

if (customForm) {
  customForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = customInput.value.trim();

    if (text === "") {
      return;
    }

    addCustomItem(text);
    customInput.value = "";
  });
}

if (customList) {
  customList.addEventListener("click", (event) => {
    const target = event.target;
    const id = Number(target.dataset.id);
    const action = target.dataset.action;

    if (!id || !action) {
      return;
    }

    if (action === "toggle-custom") {
      toggleCustomItem(id);
    } else if (action === "remove-custom") {
      removeCustomItem(id);
    }
  });
}

// =========================
// Goals
// =========================
const goalList = document.querySelector("#goal-list");

let goals = JSON.parse(localStorage.getItem("planhub-goals")) || [
  {
    id: 1,
    title: "Expand library of guitar songs",
    description: "Learn 10 new guitar songs",
    progress: 0
  },
  {
    id: 2,
    title: "Save for Hawaii",
    description: "Save up $1000 for the flights and food while you're there",
    progress: 65
  },
  {
    id: 3,
    title: "Excersize more consistently",
    description: "Add 10% for every week of consistent exersize (3 times per week)",
    progress: 50
  }
];

function saveGoals() {
  localStorage.setItem("planhub-goals", JSON.stringify(goals));
}

function updateGoalStats() {
  const averageNode = document.querySelector("#goal-average");

  if (!averageNode) return;

  if (goals.length === 0) {
    averageNode.textContent = "0%";
    return;
  }

  const total = goals.reduce((sum, goal) => sum + goal.progress, 0);
  const average = Math.round(total / goals.length);

  averageNode.textContent = `${average}%`;
}

function renderGoals() {
  if (!goalList) return;

  goalList.innerHTML = "";

  goals.forEach((goal) => {
    const article = document.createElement("article");
    article.className = "goal-card";

    article.innerHTML = `
      <h3>${goal.title}</h3>
      <p>${goal.description}</p>
      <div class="goal-progress" aria-label="Goal progress">
        <div class="goal-fill" style="width: ${goal.progress}%"></div>
      </div>
      <div class="goal-controls">
        <span><strong>${goal.progress}%</strong> complete</span>
        <button class="goal-button" data-id="${goal.id}" data-change="-5" type="button">-5%</button>
        <button class="goal-button" data-id="${goal.id}" data-change="5" type="button">+5%</button>
      </div>
    `;

    goalList.appendChild(article);
  });

  updateGoalStats();
}

function updateGoalProgress(id, amount) {
  const selectedGoal = goals.find((goal) => goal.id === id);

  if (!selectedGoal) {
    return;
  }

  let newProgress = selectedGoal.progress + amount;

  if (newProgress < 0) {
    newProgress = 0;
  } else if (newProgress > 100) {
    newProgress = 100;
  }

  selectedGoal.progress = newProgress;
  saveGoals();
  renderGoals();
}

if (goalList) {
  goalList.addEventListener("click", (event) => {
    const target = event.target;

    if (!target.classList.contains("goal-button")) {
      return;
    }

    const id = Number(target.dataset.id);
    const change = Number(target.dataset.change);

    updateGoalProgress(id, change);
  });
}

// =========================
// Initial Render
// =========================
displayRandomQuote();
renderRecipes();
renderActivities();
renderTodos();
renderCustomItems();
renderGoals();