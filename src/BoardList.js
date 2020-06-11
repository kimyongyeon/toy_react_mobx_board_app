import React, {Component} from 'react';

const Tr = (list) =>
    <tr>
        <td>{list.no}</td>
        <td>{list.title}</td>
        <td>{list.contents}</td>
        <td>{list.writer}</td>
    </tr>



class BoardList extends Component {

    constructor(props) {
        super(props)
        this.list = []
        for (let i=0; i<10; i++) {
            this.list[i] = {
                no: i + 1,
                title: "제목 입니다. " + i,
                contents: "내용 입니다. " + i,
                writer: "글쓴이 입니다. " + i,
            }
        }
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td>순번</td>
                        <td>제목</td>
                        <td>내용</td>
                        <td>글쓴이</td>
                    </tr>
                    {this.list.map(b => {
                        return <Tr key={b.no}
                                   no={b.no}
                                   title={b.title}
                                   contents={b.contents}
                                   writer={b.writer} />
                    })}
                </table>
            </div>
        );
    }
}

export default BoardList;