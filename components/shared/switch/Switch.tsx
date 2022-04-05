import './Switch.module.scss';
import { ChangeEvent, ReactElement, useCallback, useState } from 'react';

export interface SwitchProps {
  onChange: (val: boolean) => void;
}

export function Switch(props: SwitchProps): ReactElement {
  const [toggled, setToggled] = useState(false);
  const toggle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.checked;
      setToggled(val);
      props.onChange(val);
    },
    [props]
  );
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={toggled}
        onChange={(evt) => toggle(evt)}
      />
      <span className="slider round" />
    </label>
  );
}
