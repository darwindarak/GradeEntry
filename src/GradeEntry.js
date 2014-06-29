/** @jsx React.DOM */

// Random names generated by benkeen/generatedata
var fileData = {
"fields": ["First Name", "Last Name", "Student ID", "HW4"],
"rows":[{"First Name": "Cadman", "Last Name": "Odonnell", "Student ID": "560631518", "HW4": "0"},
{"First Name": "Ava", "Last Name": "Morgan", "Student ID": "141369298", "HW4": "0"},
{"First Name": "Naomi", "Last Name": "Donaldson", "Student ID": "768517703", "HW4": "0"},
{"First Name": "Alexander", "Last Name": "Benson", "Student ID": "960546997", "HW4": "0"},
{"First Name": "September", "Last Name": "Chambers", "Student ID": "072091341", "HW4": "0"},
{"First Name": "Dale", "Last Name": "Cole", "Student ID": "669971269", "HW4": "0"},
{"First Name": "Sonya", "Last Name": "Stein", "Student ID": "069539678", "HW4": "0"},
{"First Name": "Haley", "Last Name": "Walters", "Student ID": "984253597", "HW4": "0"},
{"First Name": "Forrest", "Last Name": "Vaughn", "Student ID": "465293236", "HW4": "0"},
{"First Name": "Blair", "Last Name": "Higgins", "Student ID": "376785676", "HW4": "0"},
{"First Name": "Jael", "Last Name": "Bean", "Student ID": "710908290", "HW4": "0"},
{"First Name": "Dorothy", "Last Name": "Whitaker", "Student ID": "629701114", "HW4": "0"},
{"First Name": "Orlando", "Last Name": "Jacobson", "Student ID": "743632594", "HW4": "0"},
{"First Name": "Tate", "Last Name": "Sellers", "Student ID": "176868673", "HW4": "0"},
{"First Name": "Fulton", "Last Name": "Oconnor", "Student ID": "201731628", "HW4": "0"},
{"First Name": "Melvin", "Last Name": "Bradley", "Student ID": "087233071", "HW4": "0"},
{"First Name": "Paki", "Last Name": "Sherman", "Student ID": "879373060", "HW4": "0"},
{"First Name": "Lewis", "Last Name": "Kane", "Student ID": "399545280", "HW4": "0"},
{"First Name": "Chase", "Last Name": "Robbins", "Student ID": "045556728", "HW4": "0"},
{"First Name": "Omar", "Last Name": "Garrison", "Student ID": "434410430", "HW4": "0"},
{"First Name": "Trevor", "Last Name": "Barker", "Student ID": "684411230", "HW4": "0"},
{"First Name": "Ashton", "Last Name": "Gonzales", "Student ID": "218498822", "HW4": "0"},
{"First Name": "Graham", "Last Name": "Key", "Student ID": "648283423", "HW4": "0"},
{"First Name": "Davis", "Last Name": "Cash", "Student ID": "054520536", "HW4": "0"},
{"First Name": "Jescie", "Last Name": "Harding", "Student ID": "926980914", "HW4": "0"},
{"First Name": "Neve", "Last Name": "Lindsey", "Student ID": "611350685", "HW4": "0"},
{"First Name": "Jarrod", "Last Name": "Newman", "Student ID": "472617887", "HW4": "0"},
{"First Name": "Travis", "Last Name": "Reeves", "Student ID": "653151382", "HW4": "0"},
{"First Name": "Elvis", "Last Name": "Macias", "Student ID": "565724856", "HW4": "0"},
{"First Name": "Quincy", "Last Name": "Weber", "Student ID": "761441456", "HW4": "0"},
{"First Name": "Bell", "Last Name": "Nelson", "Student ID": "753764211", "HW4": "0"},
{"First Name": "Dorothy", "Last Name": "Spence", "Student ID": "963886557", "HW4": "0"},
{"First Name": "Ivory", "Last Name": "George", "Student ID": "998942562", "HW4": "0"},
{"First Name": "Evan", "Last Name": "Hubbard", "Student ID": "559347525", "HW4": "0"},
{"First Name": "Wilma", "Last Name": "Mosley", "Student ID": "134466226", "HW4": "0"},
{"First Name": "Rudyard", "Last Name": "Ayala", "Student ID": "612946315", "HW4": "0"},
{"First Name": "Seth", "Last Name": "Stein", "Student ID": "823803384", "HW4": "0"},
{"First Name": "Benjamin", "Last Name": "Santana", "Student ID": "437702713", "HW4": "0"},
{"First Name": "Lysandra", "Last Name": "Rojas", "Student ID": "143627636", "HW4": "0"}]
}

function readCSV() {
    $('input[type=file]').parse({
  config: {
    dynamicTyping: false,
  // header: false
    // base config to use for each file
  },
  before: function(file, inputElem)
  {
    // executed before parsing each file begins;
    // what you return here controls the flow
  },
  error: function(err, file, inputElem)
  {
    // executed if an error occurs during loading the file,
    // or if the file being iterated is the wrong type,
    // or if the input element has no files selected
  },
  complete: function(results, file, inputElem, event)
  {
      fileData = results.results;
      React.renderComponent(
          <Table data={fileData}/>,
        document.getElementById('content')
      );
  }
});
}

var triggerFileInput = function() {
    $('#csv_source').click();
};


var Table = React.createClass({
    saveData: function(){
        var filename = $('#csv_source').val()
        if (filename != "") {
            filename = "edited-" + filename.split(/(\\|\/)/g).pop()
        }
        else
        {
            filename = "sample_data.csv"
        }

        var csvfile = this.state.data.fields.join(',') + '\n' +  
        this.state.data.rows.map(function(row, i) {
            return Object.keys(row).map(function(keys) {
                return row[keys];
            }).join(',');
        }).join('\n')

        var blob = new Blob([csvfile], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
        $('#filter').focus()
    },
    prepareData: function(data) {
        var display_columns = [];
        for (var i = 0; i < data.fields.length-1; i++) {
            display_columns.push(data.fields[i])
        }
        var entry_column = data.fields[data.fields.length-1]
        this.cache.sortIndex = []
        for (var i = 0; i < data.rows.length; i++) {
            this.cache.sortIndex.push(i);
        }
        this.cache.searchStrings = 
            data.rows.map(function(row) {
                var searchString = "";
                for (var i = 0; i < display_columns.length; i++) {
                    searchString += row[display_columns[i]].trim() + " "
                }
                return searchString;
            });
        this.setState({data: data, sortColumn: display_columns[0], display_columns: display_columns, entry_column: entry_column});
        $('#filter').focus()
    },
    loadFile: function() {
        $('input[type=file]').parse({
            config: {dynamicTyping: false},
            complete: function(results, file, inputElem, event) {
                this.prepareData(results.results);
            }.bind(this)
        })
    },
    cache: {
        sortIndex: [],
        searchStrings: []
    },
    getInitialState: function() {
        // Initial test data
        return {data: {}, display_columns: [], entry_column: "", filter: new RegExp(".+"), sortColumn: "", sortDir: -1}
    },
    sortData: function(e) {
        colname = e.target.innerHTML;
        var dir;
        if (colname == this.state.sortColumn){
            dir = -this.state.sortDir;
        }
        else
        {
            dir = 1;
        }

        this.cache.sortIndex.sort(function(a,b){
            if (this.props.data.rows[a][colname] > this.props.data.rows[b][colname]){
                return dir;
            }
            else
            {
                return -dir;
            }
        }.bind(this));
        this.setState({sortColumn: colname, sortDir: dir})

    },
    componentDidMount: function() {
        this.prepareData(this.props.data);
    },
    update_filter: function(e){
        var search = e.target.value;
        regex = "(" + search + ")|(";
        regex += search.split('').map(function(c){return "\\b" + c + "\\" + "w*\\s*";}).join("")
        regex += ")"

        this.setState({filter: new RegExp(regex, "i")})
    },
    keyUp: function(e) {
        if (e.which == 13) {
            $('#dataview tr:first input').select()
        }
    },
    render: function() {
        var table_rows = [];
        var search_str = ""
        for (var i = 0; i < this.cache.sortIndex.length; i++) {
            var index = this.cache.sortIndex[i];

            if (this.state.filter.test(this.cache.searchStrings[index])) {
                table_rows.push(
                   <TableRow key={index} display_columns={this.state.display_columns} entry_column={this.state.entry_column} data_row={this.state.data["rows"][index]}/> 
                );
            }
        }
        var table_header = this.state.display_columns.map(function(name, i) {
            return (
                <th key={i} onClick={this.sortData}>{name}</th>
                )
        }.bind(this));
        table_header.push(
            <th key="entry" onClick={this.sortData}>{this.state.entry_column}</th>
            );
        return (
            <div className="container">
                <div className="row" id="header">
                    <div id="inputmask" className="col-md-3">
                        <button onClick={triggerFileInput} id="file_load" type="button" className="btn btn-primary" >Open File</button>
                        <input type="file" id="csv_source" onChange={this.loadFile}></input>
                    </div>
                    <div className="col-md-6">
                        <input id="filter" className="form-control" type="text" placeholder="Filter sample data" onChange={this.update_filter} onKeyUp={this.keyUp} />
                    </div>
                    <div className="col-md-3">
                        <button id="file_save" type="button" className="btn btn-success" onClick={this.saveData}>Save File</button>
                    </div>
                </div>
                <div id="data_view" className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <table className="table">
                            <thead>
                            <tr>{table_header}</tr>
                            </thead>
                            <tbody id="dataview">
                                {table_rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
})

// Properties:
//     key (row)
//     display_columns
//     entry_column
//     data_row
var TableRow = React.createClass({
    getInitialState: function(){
        return {
            cell_value: "",
            clean: true
        }
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({
        cell_value: nextProps.data_row[nextProps.entry_column].trim(),
        clean: true,
      });
    },
    componentDidMount: function() {
        this.setState({
            cell_value: this.props.data_row[this.props.entry_column].trim(),
            clean: true
        })
    },
    update_cell: function(e){
        this.setState({cell_value: e.target.value});
    },
    update_data: function(e){
        // e.preventDefault()
        if (e.which == 13) {
            this.props.data_row[this.props.entry_column] = e.target.value
            $('#filter').select();
        }
        else if (e.which == 27) {
            this.setState({cell_value: this.props.data_row[this.props.entry_column]})
        }
        else if (e.which == 38) {
            $(e.target).closest('tr').prev().find('input').select();
        }
        else if (e.which == 40) {
            $(e.target).closest('tr').next().find('input').select();
        }
    },
    render: function() {
        var display_columns = this.props.display_columns.map(function(colname){
            return (
                <td key={colname}>{this.props.data_row[colname]}</td>
            )
        }.bind(this))

        var entry_column = (
            // <td contentEditable={true} onChange={this.update_cell} onKeyUp={this.update_data}>{this.state.cell_value}</td>
            <td>
                <input key={this.props.key} type="text" value={this.state.cell_value} onChange={this.update_cell} onKeyUp={this.update_data} />
            </td>
        )

        return (
            <tr>
            {display_columns}
            {entry_column}
            </tr>
        )
    }
})

React.renderComponent(
    <Table data={fileData}/>,
    document.getElementById('content')
)

$('#filter').focus()