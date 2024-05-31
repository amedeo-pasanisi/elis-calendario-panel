import { PanelPlugin } from '@grafana/data';
import { CalendarioOptions } from './types';
import { CalendarioPanel } from './components/CalendarioPanel';

export const plugin = new PanelPlugin<CalendarioOptions>(CalendarioPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'variable_data_inizio',
      name: 'Data inizio',
      description: 'inserisci la variabile della data di inizio',
      defaultValue: 'data_inizio'
    })
    .addTextInput({
      path: 'variable_data_fine',
      name: 'Data fine',
      description: 'inserisci la variabile della data di fine',
      defaultValue: 'data_fine'
    })
});
