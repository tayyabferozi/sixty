import React from 'react';



class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = {
            displayMenu: false,
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state =
        {
            options: [
                {
                    name: 'Select…',
                    value: null,
                },
                {
                    name: 'day',
                    value: 'day',
                },
                {
                    name: 'week',
                    value: 'week',
                },
                {
                    name: 'month',
                    value: 'month',
                },
            ],
            value: '?',
        };

    };

    componentDidMount() {
        console.log(this.props);
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    handleChange = (event) => {
        this.setState({ value: event.target.value }); 
        this.props.changeView(event.target.value);   
    };
    // handleChange = (e, data) => {
    //     this.setState({selectValue:data.value});
    //   };
    // onClickMenu(e) {
    //     // var target = $(e.target).closest('a[role="menuitem"]')[0];
    //     // var action = getDataAction(target);
    //     var options = this.cal.getOptions();
    //     var viewName = '';

    //     // console.log(target);
    //     // console.log(action);
    //     switch (action) {
    //         case 'toggle-daily':
    //             viewName = 'day';
    //             break;
    //         case 'toggle-weekly':
    //             viewName = 'week';
    //             break;
    //         case 'toggle-monthly':
    //             options.month.visibleWeeksCount = 0;
    //             viewName = 'month';
    //             break;
    //         case 'toggle-weeks2':
    //             options.month.visibleWeeksCount = 2;
    //             viewName = 'month';
    //             break;
    //         case 'toggle-weeks3':
    //             options.month.visibleWeeksCount = 3;
    //             viewName = 'month';
    //             break;
    //         case 'toggle-narrow-weekend':
    //             options.month.narrowWeekend = !options.month.narrowWeekend;
    //             options.week.narrowWeekend = !options.week.narrowWeekend;
    //             viewName = cal.getViewName();

    //             target.querySelector('input').checked = options.month.narrowWeekend;
    //             break;
    //         case 'toggle-start-day-1':
    //             options.month.startDayOfWeek = options.month.startDayOfWeek ? 0 : 1;
    //             options.week.startDayOfWeek = options.week.startDayOfWeek ? 0 : 1;
    //             viewName = cal.getViewName();

    //             target.querySelector('input').checked = options.month.startDayOfWeek;
    //             break;
    //         case 'toggle-workweek':
    //             options.month.workweek = !options.month.workweek;
    //             options.week.workweek = !options.week.workweek;
    //             viewName = cal.getViewName();

    //             target.querySelector('input').checked = !options.month.workweek;
    //             break;
    //         default:
    //             break;
    //     }

    //     cal.setOptions(options, true);
    //     cal.changeView(viewName, true);

    //     setDropdownCalendarType();
    //     setRenderRangeText();
    //     setSchedules();
    // }


    render() {
        console.log("Dropdownlist");
        console.log(this.props);
        const { options, value } = this.state;
        return (
            
            <div id="dropdown-menu">
                <select onChange={this.handleChange} className="select-css">
                    {options.map(item => (
                        <option key={item.value} value={item.value}>
                            {item.name}
                        </option>
                    ))}
                </select>

            </div>
        );
    }
}


// function getDataAction(target) {
//     return target.dataset ? target.dataset.action : target.getAttribute('data-action');
// }

export default Dropdown;