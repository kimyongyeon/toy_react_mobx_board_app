import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

@inject('board')
@observer
class BoardList extends Component {

    constructor(props) {
        super(props)

        // event binding
        this.inputHandleChange = this.inputHandleChange.bind(this); // input 키입력
        this.inputInit = this.inputInit.bind(this) // input clear
        this.rowAdd = this.rowAdd.bind(this) // row 추가
        this.rowEdit = this.rowEdit.bind(this) // row 수정
        this.rowRemove = this.rowRemove.bind(this) // row 삭제
        this.rowClick = this.rowClick.bind(this) // row 클릭

        // state 초기화
        this.state = {
            check: false,
            title: '',
            contents: '',
            writer: '',
        }

    }

    // input row change
    inputHandleChange (e, type) {
        if (type === 1) {
            this.setState({
                title: e.target.value
            })
        } else if ( type === 2) {
            this.setState({
                contents: e.target.value
            })
        } else if ( type === 3) {
            this.setState({
                writer: e.target.value
            })
        }
    }

    // table row click
    rowClick(e, no) {
        const { board } = this.props;
        board.get()
            .filter(b => b.no === no)
            .map(b => {
            this.setState({
                no: b.no,
                title: b.title,
                contents: b.contents,
                writer: b.writer
            })
        })

    }

    // input row rowAdd
    rowAdd() {
        const { board } = this.props;
        console.log("before: " + JSON.stringify(board.get()))
        board.add({
            no: board.getUUID(),
            title: this.state.title,
            contents: this.state.contents,
            writer: this.state.writer
        })
        console.log("after: " + JSON.stringify(board.get()))
        this.inputInit();
        // 포커스 이동은 어떻게? => ref 사용해야 함.
        this.titleInput.focus();

    }

    // input row rowEdit
    rowEdit() {
        const { board } = this.props;
        board.setBoard({
            no: this.state.no,
            title: this.state.title,
            contents: this.state.contents,
            writer: this.state.writer
        })
        this.inputInit();
        // 포커스 이동은 어떻게? => ref 사용해야 함.
        this.titleInput.focus();
    }

    // table row rowRemove
    rowRemove() {
        const {board} = this.props;
        board.get().map(_b => {
            if(_b.check) {
                board.rowRemove(_b);
            }
        })
        this.inputInit();
    }

    // input row inputInit
    inputInit() {
        this.setState({
            title: '',
            contents: '',
            writer: ''
        })
    }

    // checkbox click
    isCheck(e, b) {
        b.check = !b.check;
    }

    // table draw
    trDraw(b) {
        return  (
            <tr key={b.no}>
                <td><input type="checkbox" value={b.check} onClick={e => this.isCheck(e, b)}/> {b.no}</td>
                <td onClick={e => {
                    this.rowClick(e, b.no)
                }}>{b.title}</td>
                <td>{b.contents}</td>
                <td>{b.writer}</td>
            </tr>
        )
    }

    // ref focus
    componentDidMount(){
        this.titleInput.focus();
    }

    render() {
        const { board } = this.props;
        return (
            <div>
                <table >
                    <thead>
                        <tr>
                            <td><input ref={(input) => { this.titleInput = input; }}  type="text" value={this.state.title} onChange={e => this.inputHandleChange(e, 1)} placeholder="제목"/></td>
                            <td><input type="text" value={this.state.contents} onChange={e => this.inputHandleChange(e, 2)} placeholder="내용"/></td>
                            <td><input type="text" value={this.state.writer} onChange={e => this.inputHandleChange(e, 3)} placeholder="글쓴이"/></td>
                        </tr>
                    </thead>
                </table>
                <button onClick={this.rowAdd}>추가</button>
                <button onClick={this.rowEdit}>수정</button>
                <button onClick={this.rowRemove}>삭제</button>
                <button onClick={this.inputInit}>초기화</button>
                <table >
                    <thead>
                    <tr>
                        <td><input type="checkbox"/> 순번 </td>
                        <td>제목</td>
                        <td>내용</td>
                        <td>글쓴이</td>
                    </tr>
                    </thead>
                    <tbody>
                        {board.get().map(b => this.trDraw(b))}
                    </tbody>
                </table>
                
            </div>
        );
    }
}

export default BoardList;