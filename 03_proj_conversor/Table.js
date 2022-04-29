class Table {
  //convertendo array em table js
  constructor(arr) {
    this.header = arr[0];
    arr.shift(); //remove 1 elemento do array
    this.rows = arr;
  }
  get RowCount() {
    //só precisa ser chamado como um static, atribtuto...
    return this.rows.length;
  }

  get ColumnCount() {
    return this.header.length;
  }
}

module.exports = Table;
