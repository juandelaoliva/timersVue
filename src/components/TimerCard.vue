<script>
export default {
  name: "TimerCard",
  props: {
    timer: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      placeholder: 'Loading...',
      stopResumeButton: 'Stop',
      overlayAndFormVisible: false,
      newTimerTitle: '',
      newTimerSubTitle: ''
    }
  },

  emits: ['remove-timer'],

  methods: {
    // Emit event to remove this timer.
    removeTimer() {
      this.$emit('remove-timer')
    },

    // Check if the timer is running or stopped.
    checkStartStop() {
      this.stopResumeButton = this.timer.end !== "" ? 'Resume' : 'Stop';
    },

    // Manage stop/Resume button.
    startStopTimer() {
      // Log the moment when the button is clicked.
      let startStopMoment = new Date();
      let timestamp = startStopMoment.getTime();

      // For running timers.
      if (this.timer.end === "") {
        this.timer.end = timestamp;
        this.stopResumeButton = 'Resume';
      }
      // For stopped timers.
      else {
        this.stopResumeButton = 'Stop';
        let diff = this.timer.end - this.timer.start;
        this.timer.buffer += diff;
        this.timer.start = timestamp;
        this.timer.end = ""
      }
    },

    // Create a readable format for time.
    parseTime(startPoint, end) {
      let hoursMinsSecs = [];
      let distance = end - startPoint;

      // Time calculations for hours, minutes and seconds
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      hoursMinsSecs = [hours, minutes, seconds];

      let result = hoursMinsSecs[0] + "h " +
        hoursMinsSecs[1] + "m " +
        hoursMinsSecs[2] + "s";

      // Change the placeholder with the value.
      this.placeholder = result
    },

    // Manage timer animation.
    timeAnimation(timerStart, timerEnd, timerBuffer) {
      let startingPoint = timerStart - timerBuffer;

      // If timer is stopped.
      if (timerEnd !== '') {
        this.parseTime(startingPoint, timerEnd)
      } else {
        // Update the count down every 1 second
        let x = setInterval(() => {
          let now = new Date().getTime();
          // Find the distance between now and the count down date
          this.parseTime(startingPoint, now);
          clearInterval(x);
        }, 1000);
      }
    },

    // Show timer editing form and overlay.
    viewEditForm() {
      this.overlayAndFormVisible = true;
    },

    // Hide timer editing form.
    hideEditForm() {
      this.newTimerTitle = "";
      this.newTimerSubTitle = "";
      this.overlayAndFormVisible = false;
    },

    // Edit timer.
    editTimer() {
      this.timer.title = this.newTimerTitle;
      this.timer.subtitle = this.newTimerSubTitle;

      this.hideEditForm();
    },

    // Cancel editing timer.
    cancelEdit() {
      this.hideEditForm();
    },
  }
}
</script>

<template>
  <!-- Timer card template -->
  <div class="content-container" :class="stopResumeButton">
    <div class="text-wrapper">
      <div class="timer-title">{{ timer.title }}</div>
      <div class="timer-subtitle">{{ timer.subtitle }}</div>
      <div class="timer-diff"> {{ timeAnimation(timer.start, timer.end, timer.buffer) }} {{ placeholder }}</div>
      <div class="edit-delete-wrapper">
        <button class="delete" @click="removeTimer">
          <img
            src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-lineal-kiranshastry.png">
        </button>
        <button class="edit" @click="viewEditForm">
          <img
            src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-edit-interface-kiranshastry-lineal-kiranshastry.png"></button>
      </div>
      <div class="start-stop-button">
        <button @click="startStopTimer" class="custom-btn" :class="stopResumeButton"> {{ checkStartStop() }} {{
            stopResumeButton
        }}</button>
      </div>
    </div>
  </div>

  <!-- Creation form and overlay -->
  <div v-if="overlayAndFormVisible" class="overlay edit-overlay"></div>

  <div v-if="overlayAndFormVisible" class="edit-form-wrapper">
    <h2>Edit Timer</h2>
    <form @submit.prevent="editTimer" id="edit-timer" class="edit-timer-form">
      <label for="newTimerTitle">Timer title</label>
      <input v-model="newTimerTitle" type="text" id="newTimerTitle" name="title" :placeholder="timer.title" />

      <label for="newTimerSubTitle">Timer subtitle</label>
      <input v-model="newTimerSubTitle" type="text" id="newTimerSubTitle" name="subtitle"
        :placeholder="timer.subtitle" />

      <div class="buttons-wrapper">
        <button type="submit" class="custom-btn">Save</button>
        <button @click="cancelEdit" class="custom-btn">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style>
.edit-form-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  max-width: 90%;
  background-color: rgb(234, 240, 203);
  z-index: 100;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
}

.edit-form-wrapper h2 {
  margin-top: 0;
}

.timer-title {
  font-size: 30px;
}

.timer-subtitle {
  color: #3f3f3a;
}

.timer-diff {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  font-size: 35px;
  font-weight: 400;
  margin-bottom: 20px;
}

.edit-delete-wrapper {
  position: absolute;
  top: 15px;
  right: 15px;
}

.content-container {
  padding: 15px;
}

.content-container.Resume {
  background-color: rgb(248, 206, 206);
}
</style>
