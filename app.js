
var arr = [
    {
        x: 50,
        y: 50,
        label: 'I am Groot'
    },
    {
        x: 150,
        y: 50,
        label: 'I am Racoon'
    },
    {
        x: 250,
        y: 50,
        label: 'I am Starlord'
    },
    {
        x: 250,
        y: 70,
        label: 'you wont see me'
    },
    {
        x: 150,
        y: 60,
        label: 'im invisible'
    },
    {
        x: 350,
        y: 60,
        label: 'Hello, World!'
    },
    {
        x: 280,
        y: 70,
        label: 'Hellooo'
    }
];

class ChartDot extends React.Component {
    constructor(props){
        super(props);
        this.x = props.cx;
        this.y = props.cy;
    }

    render() {
        return (
            <circle cx={this.x} cy={this.y} r={4} className={'dot'}></circle>
    );
    }
}

class Axes extends React.Component {

    constructor(props){
        super(props);
        this.len = props.len;
    }

    getXNums(){
        let nums = [];
        for (let i = 0; i < this.len ; i+=100){
            nums.push(<text x={i+20} y={this.len-10} textAnchor={"middle"} fontSize={11}>{i.toString()}</text>);
        }
        return nums;
    }

    getYNums(){
        let nums = [];
        for (let i = this.len-100; i > 0 ; i-=100){
            nums.push(<text x={10} y={i-20} textAnchor={"middle"} fontSize={11}>{(this.len-i).toString()}</text>);
        }
        return nums;
    }

    render(){
        let xnums = this.getXNums();
        let ynums = this.getYNums();
        return(
            <svg>
            <line x1={20} y1={this.len-20} y2={this.len - 20} x2={this.len - 20} className={"Axe"}/>
            <line x1={20} y1={this.len-20} y2={20} x2={20} className={"Axe"}/>
            <text x={this.len-40} y={this.len-10}>x</text>
        <text x={10} y={40} >y</text>
            {xnums}
        {ynums}
    </svg>
    );
    }
}

class Label extends React.Component {
    constructor(props){
        super(props);
        this.x = props.x;
        this.y = props.y;
        this.value = props.value;
    }

    render() {
        return (
            <text x={this.x} y={this.y} fontSize={11} textAnchor={"middle"} className={'label'}>{this.value}</text>
    );
    }
}

class MainChart extends React.Component {
    constructor(props){
        super(props);
        this.len = 600;
    }

    isOverlapped(r1, r2) {
        let r1 = r1.getBoundingClientRect();
        let r2 = r2.getBoundingClientRect();


        return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
    }

    getDotsOnChart(){
        let dots = [];
        for (let i = 0; i < arr.length; i++) {
            dots.push(<ChartDot cx={arr[i].x+20} cy={this.len-arr[i].y-20}/>);
        }
        return dots;
    }

    getLabelsOnChart(){
        let labels = [];
        for (let i = 0; i < arr.length; i++) {
            labels.push(<Label x={arr[i].x+20} y={this.len-arr[i].y-5} value={arr[i].label}/>);
        }
        return labels;
    }

    removeOverlappingLabels(){
        let dots = document.getElementsByClassName('dot');
        let labels = document.getElementsByClassName('label');
        for(let li = 0; li < labels.length; li++){
            for(let di = 0; di < dots.length; di++){
                if (this.isOverlapped(labels[li],dots[di])){
                    labels[li].style.display = 'none';
                }
            }
            for(let lii = labels.length-1; lii > li; lii--){
                if(this.isOverlapped(labels[li], labels[lii])){
                    labels[lii].style.display = 'none';
                }
            }
        }
    }

    render() {

        return (
            <svg width={this.len} height={this.len} className={"mainChart"}>
            <Axes len={this.len}/>
        {this.getDotsOnChart()}
        {this.getLabelsOnChart()}
    </svg>
    );
    }

    componentDidMount() {
        this.removeOverlappingLabels();
    }

}


ReactDOM.render(
<MainChart />,
    document.getElementById('root')
);