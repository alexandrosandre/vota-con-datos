import { render } from 'preact';
import './index.css';
import { App } from './app';
import { aplicarTema } from './temas';

aplicarTema();

render(<App />, document.getElementById('app')!);
