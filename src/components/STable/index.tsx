/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-02-17 09:48:42
 * @LastEditTime: 2022-08-12 16:31:26
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\components\STable\index.tsx
 */

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import type { ProTableProps } from "@ant-design/pro-table";
import cns from "classnames";
import "./index.less";
interface STablePaginationProps {
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  showTotal?: (total: number, range?: any) => any;
  simple?: boolean;
  showLessItems?: boolean;
  pageSize?: number;
  current?: number;
  size?: "default" | "small";
}
interface STableSearchProps {
  filterType?: "query" | "light";
  labelWidth?: number | "auto";
  collapsed?: boolean;
  onCollapse: (collapsed: boolean) => void;
}
export interface STableProps extends ProTableProps<any, any> {
  showColumnIndex?: boolean;
  autoScroll?: boolean; // if use auto scroll please confirm you have set a unique className
  defaultSearchCollapsed?: boolean;
  columns: any[];
  request: any;
}

const defaultPagination: STablePaginationProps = {
  pageSize: 10,
  size: "default",
  showSizeChanger: true,
};

const columnIndex = {
  dataIndex: "index",
  valueType: "indexBorder",
  width: 39,
};

const tableWrapperResizeObserver: any = {};

const STable: FC<STableProps> = (props) => {
  const {
    className,
    request,
    columns,
    search = {},
    form = {},
    actionRef,
    pagination = {},
    rowSelection,
    autoScroll,
    scroll,
    headerTitle,
    toolBarRender,
    rowKey = "key",
    dateFormatter = "string",
    tableAlertRender = false,
    options = false,
    defaultSearchCollapsed = true,
    showColumnIndex = true,
    bordered,
    expandable,
  } = props;

  const [searchCollapsed, setSearchCollapsed] = useState<boolean>(
    defaultSearchCollapsed
  );
  const [tableHeight, setTableHeight] = useState<any>(undefined);
  const defaultActionRef = useRef<any>(null);
  const actRef = actionRef || defaultActionRef;
  const showColumns = showColumnIndex ? [columnIndex, ...columns] : columns;
  const defaultSearchProps: STableSearchProps = {
    labelWidth: "auto",
    collapsed: searchCollapsed,
    onCollapse: (collapsed: boolean) => {
      setSearchCollapsed(collapsed);
    },
  };

  function getTableWrap(): any {
    if (className) {
      return document.querySelector(
        `.autoFit-table.${className} .ant-table-wrapper`
      );
    }
    return document.querySelector(".autoFit-table .ant-table-wrapper");
  }

  function resetTableHeight() {
    const autoFitTableRef = getTableWrap();
    const paginationHeightAndGutter = 48; // height 24 + marginTop 16
    const tableHeaderHeight = 39; // table header height
    const computedHeight = autoFitTableRef
      ? parseInt(window.getComputedStyle(getTableWrap()).height, 10) -
        paginationHeightAndGutter -
        tableHeaderHeight
      : undefined;
    setTableHeight(computedHeight);
    return computedHeight;
  }

  function resizeTableWrap() {
    if (autoScroll)
      setTimeout(() => {
        resetTableHeight();
      });
  }

  function addTableWrapObserver() {
    if (className && !tableWrapperResizeObserver[className]) {
      const autoFitTableRef = getTableWrap();
      tableWrapperResizeObserver[className] = new ResizeObserver(() => {
        resizeTableWrap();
      });
      if (autoFitTableRef) {
        tableWrapperResizeObserver[className].observe(autoFitTableRef);
      }
    }
  }

  useEffect(() => {
    resizeTableWrap();
  });

  useEffect(() => {
    window.addEventListener("resize", resizeTableWrap);
    addTableWrapObserver();
    return () => {
      window.removeEventListener("resize", resizeTableWrap);
      if (className) {
        tableWrapperResizeObserver[className] = null;
      }
    };
  }, []);

  function getClassGroup() {
    const classGroup = ["s-table"];
    if (autoScroll) {
      classGroup.push("autoFit-table");
    }
    if (className) {
      classGroup.push(className);
    }
    return classGroup;
  }

  return (
    <ProTable
      bordered={bordered}
      actionRef={actRef}
      className={cns(getClassGroup())}
      columns={showColumns}
      size={"small"}
      request={request}
      rowKey={rowKey}
      pagination={pagination && { ...defaultPagination, ...pagination }}
      options={options}
      search={search ? { ...defaultSearchProps, ...search } : search}
      form={{
        autoFocusFirstInput: false,
        ...form,
      }}
      tableAlertRender={tableAlertRender}
      dateFormatter={dateFormatter}
      headerTitle={headerTitle}
      toolBarRender={toolBarRender}
      scroll={autoScroll ? { y: tableHeight } : scroll}
      rowSelection={rowSelection}
      expandable={expandable}
    />
  );
};

export default STable;
