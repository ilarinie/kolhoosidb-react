import * as React from 'react';
import { UiState } from '../../../store/ui-state';
import { observer } from 'mobx-react';
import { MenuItem, IconMenu, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

interface ThemeChooserProps {
    themes: string[];
    chosen_theme?: string;
    chooseTheme: any;
}

@observer
export class ThemeChooser extends React.Component<ThemeChooserProps, { value: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: this.props.chosen_theme || 'default'
        };
    }
    render() {
        let themes = this.props.themes.map((theme, index) => (
            <MenuItem value={theme} primaryText={theme} key={index} />
        ));
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                onChange={this.handleChange}
                value={this.state.value}
            >
                {themes}
            </IconMenu>
        );
    }

    handleChange = (event, value) => {
        let val = this.state.value;
        val = value;
        this.setState({ value: val });
        this.props.chooseTheme(value);
    }
}