/**
 * Created by mingnanwu on 5/23/15.
 */
/** @jsx React.DOM */




var ResultRow = React.createClass({
    render: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return (
            // <div className="row">
            //     <h1 className="resultItem">
            //         {this.props.TestRunId}
            //         {this.props.SuiteName}
            //     </h1>
            //     <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            // </div>
            <tr>
                <td>{this.props.TestRunId}</td>
                <td>{this.props.SuiteName}</td>
                <td>{this.props.CaseName}</td>
                <td>{this.props.LastUpdateDate}</td>
                <td>{this.props.LastUpdatedBy}</td>
                <td>{this.props.Result}</td>
            </tr>
        );
    }
});

var ResultContainer = React.createClass({
    fetchResults: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.fetchResults();
        setInterval(this.fetchResults, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="resultBox">
                <ResultList data={this.state.data} />
            </div>
        );
    }
});

var ResultList = React.createClass({
    render: function() {
        var resultNode = this.props.data.map(function(result, index) {
            return (
                <ResultRow TestRunId={result.TestRunId} SuiteName={result.SuiteName} CaseName={result.CaseName} LastUpdateDate={result.LastUpdateDate} LastUpdatedBy={result.LastUpdatedBy} Result={result.Result} key={index}>
                    {result.Result} // dead code?
                </ResultRow>
            );
        });
        return (
            // <div className="ResultList">
            //         {resultNode}
            // </div>
             <table className="center">
                <thead>
                    <tr>
                        <th>TestRunId</th>
                        <th>SuiteName</th>
                        <th>CaseName</th>
                        <th>LastUpdateDate</th>
                        <th>LastUpdatedBy</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>{resultNode}</tbody>
            </table>
        );
    }
});

React.render(
    <ResultContainer url="/result" pollInterval={2000} />,
    document.getElementById('mainBox')
);
