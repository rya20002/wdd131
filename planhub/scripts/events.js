const eventForm = document.querySelector("#event-form");
const eventList = document.querySelector("#event-list");
const totalEventsText = document.querySelector("#total-events");
const nextEventText = document.querySelector("#next-event");
const weekEventsText = document.querySelector("#week-events");

const storageKey = "planhub-events";

let events = JSON.parse(localStorage.getItem(storageKey)) || [
  {
    id: Date.now() + 1,
    title: "WDD Project Due",
    date: "2026-04-04",
    time: "11:59",
    category: "School",
    notes: "Submit final project and double check rubric."
  },
  {
    id: Date.now() + 2,
    title: "Temple Shift",
    date: "2026-04-07",
    time: "18:30",
    category: "Church",
    notes: "Leave early and bring recommend."
  }
];

function saveEvents() {
  localStorage.setItem(storageKey, JSON.stringify(events));
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatTime(timeString) {
  if (!timeString) return "No time set";

  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours, minutes);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}

function getEventDateTime(event) {
  const timeValue = event.time ? event.time : "23:59";
  return new Date(`${event.date}T${timeValue}`);
}

function sortEventsByDate() {
  events.sort((a, b) => getEventDateTime(a) - getEventDateTime(b));
}

function updateSummary() {
  totalEventsText.textContent = events.length;

  const now = new Date();
  const upcomingEvents = events.filter((event) => getEventDateTime(event) >= now);

  if (upcomingEvents.length > 0) {
    const next = upcomingEvents[0];
    nextEventText.textContent = `${next.title} • ${formatDate(next.date)}`;
  } else {
    nextEventText.textContent = "No upcoming events yet.";
  }

  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(now.getDate() + 7);

  const weekCount = events.filter((event) => {
    const eventDate = getEventDateTime(event);
    return eventDate >= now && eventDate <= oneWeekFromNow;
  }).length;

  weekEventsText.textContent = weekCount;
}

function createEventCard(event) {
  const article = document.createElement("article");
  article.classList.add("card", "page-card", "event-card");

  article.innerHTML = `
    <div class="event-top">
      <div>
        <p class="mini-label">${event.category}</p>
        <h3>${event.title}</h3>
      </div>
      <button class="remove-button" data-id="${event.id}" type="button">Delete</button>
    </div>

    <p><strong>Date:</strong> ${formatDate(event.date)}</p>
    <p><strong>Time:</strong> ${formatTime(event.time)}</p>
    <p><strong>Notes:</strong> ${event.notes ? event.notes : "No notes added."}</p>
  `;

  return article;
}

function renderEvents() {
  sortEventsByDate();
  eventList.innerHTML = "";

  if (events.length === 0) {
    eventList.innerHTML = `
      <article class="card page-card empty-state">
        <h3>No events yet</h3>
        <p>Add your first event to start keeping track of important dates.</p>
      </article>
    `;
    updateSummary();
    return;
  }

  events.forEach((event) => {
    const eventCard = createEventCard(event);
    eventList.appendChild(eventCard);
  });

  updateSummary();
}

function addEvent(eventObject) {
  events.push(eventObject);
  saveEvents();
  renderEvents();
}

function deleteEvent(eventId) {
  events = events.filter((event) => event.id !== Number(eventId));
  saveEvents();
  renderEvents();
}

eventForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#event-title").value.trim();
  const date = document.querySelector("#event-date").value;
  const time = document.querySelector("#event-time").value;
  const category = document.querySelector("#event-category").value;
  const notes = document.querySelector("#event-notes").value.trim();

  if (!title || !date) {
    return;
  }

  const newEvent = {
    id: Date.now(),
    title,
    date,
    time,
    category,
    notes
  };

  addEvent(newEvent);
  eventForm.reset();
});

eventList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    const eventId = event.target.dataset.id;
    deleteEvent(eventId);
  }
});

renderEvents();