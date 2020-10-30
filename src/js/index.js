class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

    this.daysEl = document.querySelector(
      this.selector + ' [data-value="days"]',
    );
    this.hoursEl = document.querySelector(
      this.selector + ' [data-value="hours"]',
    );
    this.minsEl = document.querySelector(
      this.selector + ' [data-value="mins"]',
    );
    this.secsEl = document.querySelector(
      this.selector + ' [data-value="secs"]',
    );

    this.DEALEY = 1000;
    this.intervalId = null;
  }

  getDaysHoursMinsSecsToEnd() {
    this.timeAnd = this.targetDate - Date.now();
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */

    const days = Math.floor(this.timeAnd / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor(
      (this.timeAnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((this.timeAnd % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((this.timeAnd % (1000 * 60)) / 1000);

    return { days, hours, mins, secs };
  }

  start() {
    this.intervalId = setInterval(() => {
      this.onTick(this.getDaysHoursMinsSecsToEnd());
    }, this.DEALEY);
  }
  onTick({ days, hours, mins, secs }) {
    this.daysEl.textContent = days;
    this.hoursEl.textContent = hours;
    this.minsEl.textContent = mins;
    this.secsEl.textContent = secs;
  }
}

const countTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('October 30, 2020'),
});

countTimer.start();
