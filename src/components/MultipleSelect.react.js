import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class MultipleSelect extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            value: [],
            lastChecked: null,
            options: this.props.options
        };
    }

    componentWillReceiveProps(newProps){
        this.setState({
            value: newProps.value
        });
        if (newProps.options !== this.props.options){
            this.setState({
                options: newProps.options,
                value: [],
                lastChecked: null
            })
        }
    }

    handleChange(event) {
      var clickedItem = event.currentTarget.attributes['data-value'].nodeValue;
      var selectedItems = event.target.value;
      var options = this.state.options;
      if (clickedItem === 'All') {
        if (selectedItems.length < options.length - 1) {
          this.setState({
            value: options,
            lastChecked: null
          });
        } else {
          this.setState({
            value: [],
            lastChecked: null
          });
        }
      } else {
        var index = selectedItems.indexOf('All');
        if (index > -1) {
          selectedItems.splice(index, 1)
        }

        if(event.shiftKey && this.state.lastChecked){
            var startIndex = options.indexOf(this.state.lastChecked);
            var endIndex = options.indexOf(clickedItem);
            selectedItems = selectedItems.concat(options.slice(startIndex, endIndex))
        }
        this.setState({
          value: selectedItems,
          lastChecked: clickedItem
        });
      }
    }

    handleDelete(option){
      const chipData = [...this.state.value];
      if (option === 'All') {
        this.setState({
            value: [],
            lastChecked: null
        })
      } else {
        const chipToDelete = chipData.indexOf(option);
        chipData.splice(chipToDelete, 1);
        const allIndex = chipData.indexOf('All');
        if(allIndex > -1){
          chipData.splice(allIndex, 1)
        }
        this.setState({
          value: chipData
        });
      }
    }

    render() {
      const {value, options, classes} = this.props;
      // modify on className
      return <div 
      className = { classes.root}
      >
        <FormControl 
        className = { classes.formControl} 
        >
        <InputLabel htmlFor = 'select-multiple-checkbox' > 
        Facility 
        </InputLabel> 
        <Select multiple value = {
          this.state.value
        }
      onChange = {
        this.handleChange
      }
      input = { < Input id = 'select-multiple-checkbox' />
      }
      renderValue = {
        selected => <div
        className = { classes.chips }
          >
        {
          selected.map(value => ( 
            <Chip key = {
              value
            }
            label = {
              value
            }
            className = { classes.chip }
            onDelete = {
              this.handleDelete(value)
            }
            />
          ))
        } </div>} 
        MenuProps={MenuProps}> {
          options.map(value => ( 
            <MenuItem key = {
              value
            }
            value = {
              value
            }
            // style = {
            //   {
            //     fontWeight: this.state.value.indexOf(value) === -1 ?
            //       theme.typography.fontWeightRegular :
            //       theme.typography.fontWeightMedium
            //   }
            // }
            >
            <Checkbox checked = {
              this.state.value.indexOf(value) > -1
            }
            /> 
            <ListItemText primary = {
              value
            }
            /> 
            </MenuItem>
          ))
        } 
        </Select> 
        </FormControl> 
        </div>;
      }
}

type Props = {
    id? : string,
    options?: any,
    value?: any,
    classes?: object
};

const defaultProps = {
    options: [
        'All',
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder'
      ],
    classes: styles
}


export default withStyles(styles, {
    withTheme: true
})(MultipleSelect);