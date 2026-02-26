const character = {
  name: "Snortleblat",
  class: "Swamp Beast Diplomat",
  level: 1,
  health: 100,
  image: "snortleblat.webp",

  attacked() {
    if (this.health <= 0) return; 

    this.health -= 20;

    if (this.health <= 0) {
      this.health = 0;
      return `Character Died`;
    }

    return `${this.name} was attacked! -20 health.`;
  },

  levelUp() {
    if (this.health <= 0) return `${this.name} can't level up because they are dead.`;

    this.level += 1;
    return `${this.name} leveled up! +1 level.`;
  }
};

const charName = document.querySelector("#charName");
const charClass = document.querySelector("#charClass");
const charLevel = document.querySelector("#charLevel");
const charHealth = document.querySelector("#charHealth");
const charImage = document.querySelector("#charImage");
const message = document.querySelector("#message");

const attackBtn = document.querySelector("#attackBtn");
const levelUpBtn = document.querySelector("#levelUpBtn");

function render(messageText = "") {
  charName.textContent = character.name;
  charClass.textContent = character.class;
  charLevel.textContent = character.level;
  charHealth.textContent = character.health;
  charImage.src = character.image;
  charImage.alt = `${character.name} character portrait`;

  message.textContent = messageText;

  const isDead = character.health <= 0;
  attackBtn.disabled = isDead;
  levelUpBtn.disabled = isDead;

}

attackBtn.addEventListener("click", () => {
  const msg = character.attacked();
  render(msg);
});

levelUpBtn.addEventListener("click", () => {
  const msg = character.levelUp();
  render(msg);
});

render("Ready for action.");