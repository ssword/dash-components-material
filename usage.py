import dash_components_material
import dash
import dash_html_components as html

app = dash.Dash('')

app.scripts.config.serve_locally = True

app.layout = html.Div([
    dash_components_material.MultipleSelect(id="test", 
    options=['All', 'tese1', 'test2', 'test3', 'test4'])
    ,
    html.Div(id='output')
])


if __name__ == '__main__':
    app.run_server(debug=True)
