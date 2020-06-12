import { observable, action } from 'mobx';

export default class BoardStore {
    @observable boardList = [
        {
            no: this.getUUID(),
            title: "더미 제목 입니다. ",
            contents: "더미 내용 입니다. ",
            writer: "admin",
            check: false
        }
    ];

    @action
    add = (board) => {
        this.boardList.push(board);
    }

    setBoard = (b) => {
        this.boardList.filter(_b => _b.no === b.no)
            .map(_b => {
                _b.no = b.no;
                _b.title = b.title;
                _b.contents = b.contents;
                _b.writer = b.writer;
                return _b;
            })
        console.log(JSON.stringify(this.boardList));
    }

    @action
    get = () => {
        return this.boardList;
    }

    remove = (b) => {
        // 해당하는 로우만 제외해서 재 생성.
        this.boardList = this.boardList.filter(_b => _b.no !== b.no)
    }

    getUUID() { // UUID v4 generator in JavaScript (RFC4122 compliant)
        return 'xxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 10 | 0, v = c === 'x' ? r : (r && 3 || 8);
            return v.toString(10);
        });
    }
}