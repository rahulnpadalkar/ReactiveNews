import React, {Component} from 'react';
import './appBar.css';

export default class AppBar extends Component {

    getClassNames(tabName) {

        if(this.props.activeTab === tabName) {
            return "col-sm-2 menu-active-tab menu-item";
        }else  {
            return "col-sm-2 menu-item";
        }

    }

    changeState(nextActiveTab) {
        this.props.parentStateModifier(nextActiveTab);
    }

    render(){
        return(
            <div className="row toolbarContainer">
                <div className="col-sm-4 branding">
                    <span className="brand-name">Reactive News</span>
                </div>
                <div className="col-sm-8 navMenu">
                    <div className="row navigationMenu">
                        <div className={this.getClassNames("New")} onClick={this.changeState.bind(this, "New")}>
                            New
                        </div>
                        <div className={this.getClassNames("Top")} onClick={this.changeState.bind(this, "Top")}>
                            Top
                        </div>
                        <div className={this.getClassNames("Best")} onClick={this.changeState.bind(this, "Best")}>
                            Best
                        </div>
                        <div className={this.getClassNames("Ask")} onClick={this.changeState.bind(this, "Ask")}>
                            Ask
                        </div>
                        <div className={this.getClassNames("Show")} onClick={this.changeState.bind(this, "Show")}>
                            Show
                        </div>
                        <div className={this.getClassNames("Jobs")} onClick={this.changeState.bind(this, "Job")}>
                            Jobs
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}