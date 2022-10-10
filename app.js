function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessage: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0) {
        this.winner = "Monster";
      } else if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
      }
    },
    monsterHealth(value) {
      if (value <= 0) {
        this.winner = "Player";
      } else if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "Draw";
      }
    },
  },
  computed: {
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    specialAttackUsed() {
      return this.currentRound % 3 !== 0;
    },
    healUsed() {
      if (this.playerHealth === 100) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 15);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(10, 15);
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 30);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'special attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      if (this.playerHealth + 15 > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += 15;
        this.attackPlayer();
      }
      this.addLogMessage('player', 'heal', 15);
    },
    surrender() {
      this.winner = "Monster";
    },
    addLogMessage(who, what, value) {
      this.logMessage.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessage=[];
    },
  },
});
app.mount("#game");
