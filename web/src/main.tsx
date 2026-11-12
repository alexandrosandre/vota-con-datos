import { render } from 'preact';
import './index.css';
import { App } from './app';
import { aplicarTema } from './temas';
import { habiaEstadoGuardado } from './store';
import { iniciarAnalitica } from './analitica';

aplicarTema();

render(<App />, document.getElementById('app')!);
iniciarAnalitica(habiaEstadoGuardado);
