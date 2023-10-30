import './index.less';

import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import cns from 'classnames';
import type { FC } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
interface STablePaginationProps {
    showQuickJumper?: boolean;
    showSizeChanger?: boolean;
    showTotal?: (total: number, range?: any) => any;
    simple?: boolean;
    showLessItems?: boolean;
    pageSize: number;
    current?: number;
    size?: 'default' | 'small';
}
interface STableSearchProps {
    filterType?: 'query' | 'light';
    labelWidth?: number | 'auto';
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
	size: 'default',
	showSizeChanger: true,
};

const columnIndex = {
	dataIndex: 'index',
	valueType: 'indexBorder',
	width: 39,
};

const tableWrapperResizeObserver: any = {};

const autoScrollClassName = 'auto-fit-table';
const PRO_TABLE_ROOT_CLASSNAME = 'pro-table-wrap';
const CUSTOM_NAME = 's-table';

const STable: FC<STableProps> = (props) => {
	const {
		className,
		request,
		columns,
		search = {},
		form = {},
		actionRef,
		pagination = defaultPagination,
		rowSelection,
		autoScroll,
		scroll,
		headerTitle,
		toolBarRender,
		rowKey = 'key',
		dateFormatter = 'string',
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
	const [pageSize, setPageSize] = useState<number>(
		defaultPagination.pageSize
	);
	const defaultActionRef = useRef<any>(null);
	const actRef = actionRef || defaultActionRef;
	const showColumns = showColumnIndex ? [columnIndex, ...columns] : columns;

	const defaultSearchProps: STableSearchProps = {
		labelWidth: 'auto',
		collapsed: searchCollapsed,
		onCollapse: (collapsed: boolean) => {
			setSearchCollapsed(collapsed);
		},
	};

	function getTableWrap(): any {
		if (className) {
			return document.querySelector(
				`.${autoScrollClassName}.${className} .ant-table-wrapper`
			);
		}
		return document.querySelector(
			'.${autoScrollClassName} .ant-table-wrapper'
		);
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
		if (autoScroll) {
			setTimeout(() => {
				resetTableHeight();
			});
		}
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
		window.addEventListener('resize', resizeTableWrap);
		addTableWrapObserver();
		return () => {
			window.removeEventListener('resize', resizeTableWrap);
			if (className) {
				tableWrapperResizeObserver[className] = null;
			}
		};
	}, []);

	function getClassGroup() {
		const classGroup = [CUSTOM_NAME];
		if (autoScroll) {
			classGroup.push(autoScrollClassName);
		}
		if (className) {
			classGroup.push(className);
		}
		return classGroup;
	}

	const paginationConfig = useMemo(() => {
		if (!pagination) return pagination;
		return {
			...defaultPagination,
			...pagination,
			pageSize,
		};
	}, [defaultPagination, pagination]);

	return (
		<div className={PRO_TABLE_ROOT_CLASSNAME}>
			<ProTable
				bordered={bordered}
				actionRef={actRef}
				className={cns(getClassGroup())}
				columns={showColumns}
				size={'small'}
				request={(requestParams: any) => {
					const { pageSize: requestPageSize } = requestParams;
					setPageSize(requestPageSize || 10);
					return request(requestParams);
				}}
				rowKey={rowKey}
				pagination={paginationConfig}
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
		</div>
	);
};

export default STable;
