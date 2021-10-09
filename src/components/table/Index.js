
import React from 'react'
import DataTable from 'react-data-table-component'
import SearchComponent from '../search/Index'

const PaginatedTable = (props) => {
    return (
        <DataTable
            columns={props.columns}
            data={props.data}
            progressPending={props.loading}
            pagination={props.pagination}
            paginationServer={props.paginationServer}
            paginationTotalRows={props.totalRows}
            onChangeRowsPerPage={props.handlePerRowsChange}
            onChangePage={props.handlePageChange}
            subHeader={props.searchable}
            subHeaderComponent={
                <SearchComponent
                    placeholder="..."
                    loading={props.searching}
                    search={query => props.search(query)}
                    clear={() => props.clearSearch()}
                />
            }
        />
    );
};

export default PaginatedTable