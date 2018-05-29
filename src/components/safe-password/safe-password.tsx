import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';

export interface PasswordStatus {
  password: string;
  isValid: boolean;
  matches: number;
}

@Component({
  tag: 'safe-password',
  styleUrl: 'safe-password.css',
  shadow: false
})
export class MyComponent {
  @Prop() first: string;
  @Prop() last: string;
  @Prop() debounceDelay = 200;

  @State() passwordValue: string;

  @State() passwordWarning: string;

  @Event() passwordUpdated: EventEmitter<PasswordStatus>;

  /**
   * The component is about to load and it has not
   * rendered yet.
   *
   * This is the best place to make any data updates
   * before the first render.
   *
   * componentWillLoad will only be called once.
   */
  componentWillLoad() {
    console.log('Component is about to be rendered');
  }

  /**
   * The component has loaded and has already rendered.
   *
   * Updating data in this method will cause the
   * component to re-render.
   *
   * componentDidLoad only be called once.
   */
  componentDidLoad() {
    console.log('Component has been rendered');
  }

  /**
   * The component is about to update and re-render.
   *
   * Called multiple times throughout the life of
   * the component as it updates.
   *
   * componentWillUpdate is not called on the first render.
   */
  componentWillUpdate() {
    console.log('Component will update and re-render');
  }

  /**
   * The component has just re-rendered.
   *
   * Called multiple times throughout the life of
   * the component as it updates.
   *
   * componentWillUpdate is not called on the
   * first render.
   */
  componentDidUpdate() {
    console.log('Component did update');
  }

  /**
   * The component did unload and the element
   * will be destroyed.
   */
  componentDidUnload() {
    console.log('Component removed from the DOM');
  }

  handleChange(event) {
    console.log('handle change hit. event is: ', event);
    // this.passwordWarning = event.target.value;
    this.passwordValue = event.target.value;
    this.debounced(
      this.debounceDelay,
      this.getRequest(
        `https://api.pwnedpasswords.com/pwnedpassword/${this.passwordValue}`
      ).then(data => {
        console.log(`searching for ${this.passwordValue}. Results are: `, data);
        this.passwordWarning = data;
      })
    );
  }

  debounced(delay, fn) {
    let timerId;
    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    };
  }

  getRequest(url: string): Promise<any> {
    return new Promise<any>(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function() {
        reject(new Error('XMLHttpRequest Error: ' + this.statusText));
      };
      request.open('GET', url);
      request.send();
    });
  }

  render() {
    return (
      <div>
        <p>
          Hello, World! I'm {this.first} {this.last}
        </p>
        <input
          type="password"
          class="safe-password-input"
          value={this.passwordValue}
          onInput={event => this.handleChange(event)}
        />
        <br />
        <span class="safe-password-warning">
          Password: {this.passwordValue}
        </span>
        <br />
        <span class="safe-password-warning">
          Warning: {this.passwordWarning}
        </span>
      </div>
    );
  }
}
