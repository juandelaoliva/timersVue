<script>
import { useMainStore } from "./store.js";
import TimerCard from "./components/TimerCard.vue";

export default {
  data() {
    return {
      newTimerTitle: "",
      newTimerSubTitle: "",
      timers: useMainStore().getAllTimers,
      overlayAndFormVisible: false
    };
  },
  methods: {

    // Show timer creation form and overlay.
    viewCreateForm() {
      this.overlayAndFormVisible = true;
    },

    // Show timer creation form and overlay.
    hideCreateForm() {
      this.newTimerTitle = "";
      this.newTimerSubTitle = "";
      this.overlayAndFormVisible = false;
    },

    // Create a new timer and add it to the localstorage.
    addTimer() {
      useMainStore().addTimer({
        id: "t-" + this.printTimestamp(),
        buffer: 0,
        end: "",
        start: this.printTimestamp(),
        title: this.newTimerTitle,
        subtitle: this.newTimerSubTitle
      });

      this.hideCreateForm();
    },

    // Cancel creation form.
    cancelCreate() {
      this.hideCreateForm();
    },

    // Remove timer by index from DOM and localstorage.
    removeTimer(index) {
      if (confirm('Are you sure you want to delete this timer?')) {
        useMainStore().removeTimer(index);
      }
    },

    // Time utilities.
    printTimestamp: function () {
      return Date.now();
    },
  },

  components: {
    TimerCard,
  }
}
</script>

<template>

  <h1>Timers. Now in Vue!</h1>

  <!-- Create a new timer button -->
  <button @click="viewCreateForm" class="add-timmer-button custom-btn">
    Add a new Timer!
  </button>

  <!-- Creation form and overlay -->
  <div v-if="overlayAndFormVisible" class="overlay"></div>

  <div v-if="overlayAndFormVisible" class="create-form-wrapper">
    <form @submit.prevent="addTimer" id="add-timer" class="add-timer-form">
      <label for="newTimerTitle">Timer title *</label>
      <input v-model="newTimerTitle" type="text" id="newTimerTitle" name="title" />

      <label for="newTimerSubTitle">Timer subtitle *</label>
      <input v-model="newTimerSubTitle" type="text" id="newTimerSubTitle" name="subtitle" />

      <div class="buttons-wrapper">
        <button type="submit" class="custom-btn">Add Timer</button>
        <button @click="cancelCreate" class="custom-btn">Cancel</button>
      </div>
    </form>
  </div>


  <!-- Placeholder fot edition forms -->
  <form id="edit-timer" class="edit-timer-form"></form>

  <!-- Timers container -->
  <div class="timers-container">
    <div v-for="(timer, index) in timers" :key="timer.id" class="timer-container" v-bind:id="timer.id"
      v-on:remove="timers.splice(index, 1)">
      <TimerCard @remove-timer="removeTimer(index)" :timer="timer"></TimerCard>
    </div>
  </div>
</template>

<style>
body {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 80em;
  width: 88%;
  font-family: Arial, Helvetica, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
}

img {
  height: auto;
  max-width: 100%;
  width: 25px;
  height: 25px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 7px;
  border: 1px solid #b4b4b4;
}

label {
  margin-bottom: 5px;
}

button:hover {
  cursor: pointer;
}

.custom-btn {
  padding: 10px 20px;
  border-radius: 7px;
  border-color: #b4b4b4;
  border-width: 1px;
}

.add-timmer-button {
  margin: 0 auto 30px;
}

.timers-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.timer-container {
  position: relative;
  width: 330px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
}


.create-form-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  max-width: 90%;
  background-color: rgb(203, 240, 228);
  z-index: 100;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
}

.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgb(75, 75, 75);
  opacity: 0.5;
}
</style>