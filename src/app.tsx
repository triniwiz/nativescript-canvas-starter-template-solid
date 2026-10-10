// Polyfills, the DOM Solid renders into, and the elements it can use
// (MasonKit's, <canvas> and <svg>). Must load first.
import './dom';
import { Application } from '@nativescript/core';
import { render } from '@nativescript-community/solid-js';
import { document } from 'dominative';
import { startSolidApp } from '@nativescript/vite/solid-bootstrap';
import { Home } from './components/Home';

startSolidApp({ Application, render, document, root: Home, rootModule: '/src/components/Home' });
