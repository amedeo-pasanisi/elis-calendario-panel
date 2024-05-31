import React from 'react';
import { PanelProps } from '@grafana/data';
import { CalendarioOptions } from 'types';
import { PanelDataErrorView, locationService } from '@grafana/runtime';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { css, cx } from '@emotion/css';
import dayjs from 'dayjs'

interface CalendarioPanelProps extends PanelProps<CalendarioOptions> {}

export const CalendarioPanel: React.FC<CalendarioPanelProps> = ({ options, data, width, height, fieldConfig, id, replaceVariables  }) => {
  const data_inizio = replaceVariables(`$${options.variable_data_inizio}`);
  const data_fine = replaceVariables(`$${options.variable_data_fine}`);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  return (
    <>
      <RangePicker
        className={cx(
          css`
            margin-top: 25px;
            width: ${width}px;
            height: ${height - 25}px;
            min-height: 40px;
            min-width: 170px;
          `
        )}
        size="large"
        format={'DD-MM-YYYY'}
        value={[
          dayjs(data_inizio).isValid() ? dayjs(data_inizio) : undefined,
          dayjs(data_fine).isValid() ? dayjs(data_fine) : undefined
        ]}
        onChange={value => {
          locationService.partial({
            [`var-${options.variable_data_inizio}`]: value?.[0]?.format('YYYY-MM-DD') ? `"${value?.[0]?.format('YYYY-MM-DD') ?? ''}"` : undefined,
            [`var-${options.variable_data_fine}`]: value?.[1]?.format('YYYY-MM-DD') ? `"${value?.[1]?.format('YYYY-MM-DD') ?? ''}"` : undefined
          }, true)}
        }
      />
    </>
  );
};
