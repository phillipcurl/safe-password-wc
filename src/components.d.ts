/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import {
  EventEmitter,
} from '@stencil/core';
import {
  PasswordStatus,
} from './components/safe-password/safe-password';

declare global {

  namespace StencilComponents {
    interface SafePassword {
      'debounceDelay': number;
      'first': string;
      'last': string;
    }
  }

  interface HTMLSafePasswordElement extends StencilComponents.SafePassword, HTMLStencilElement {}

  var HTMLSafePasswordElement: {
    prototype: HTMLSafePasswordElement;
    new (): HTMLSafePasswordElement;
  };
  interface HTMLElementTagNameMap {
    'safe-password': HTMLSafePasswordElement;
  }
  interface ElementTagNameMap {
    'safe-password': HTMLSafePasswordElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'safe-password': JSXElements.SafePasswordAttributes;
    }
  }
  namespace JSXElements {
    export interface SafePasswordAttributes extends HTMLAttributes {
      'debounceDelay'?: number;
      'first'?: string;
      'last'?: string;
      'onPasswordUpdated'?: (event: CustomEvent<PasswordStatus>) => void;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;