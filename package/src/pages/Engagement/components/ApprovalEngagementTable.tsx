import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { 
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography} from '@mui/material';
import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import qs from 'qs';
import { ChangeEvent,useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import CustomLoadingButton from '../../../components/common/CustomLoadingButton';
import ServerTableAjax from '../../../components/common/table_ajax/ServerTableAjax';
import PageWrapper from '../../../components/container/PageWrapper';
import apiClient from '../../../config/api-client';
import { ApiService } from '../../../constants/ApiService';
import useModal from '../../../hooks/use-modal';
import { selectProfile } from '../../../store/profile/selector';
import { layoutPrivateStyle } from '../../../styles/layout/private-routes';
import { ApproveListType } from '../Interface/IApprovalEngagement';
import { EngagementCategory , EngagementCategoryDetail } from '../Interface/IEngagementMaster';
import { ViewApprovalDataType } from '../Interface/IViewEngagement';
import { ModalAlertImport } from './ModalAlertImport';
import { SendBackPopUp } from './SendBackPopUp';

function TabPanel(props: {children?: React.ReactNode; index: number; value: number}){
  const {children, value, index, ...other} = props;

  return(
      <div
          role="tabpanel"
          hidden={value!== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
              <Box>
                  <Typography>{children}</Typography>
              </Box>
          )}
      </div>
  );
}

const formatHistoryDate = (dateString: string) => {
  const [datePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  return `${day.toString().padStart(2, '0')} ${monthName} ${year}`;
};

const formatDateTime = (inputDate: any) => {
  let date: Date;

  if (typeof inputDate === 'string') {
    date = new Date(inputDate);
  } else if (inputDate instanceof Date) {
    date = inputDate;
  } else {
    throw new TypeError('Invalid Date');
  }

  if (isNaN(date.getTime())) {
    throw new TypeError('Invalid Date');
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

const formatNumber = (numberString: string | number) => {
  const valueString = numberString.toString().trim();
  
  if (valueString === '') {
      return '';
  }

  const [integerPart, decimalPart] = valueString.split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

interface TableCellValueProps {
  getValue: any;
  row: any;
  column: any;
  table: any;
  tabValue: number;
  updatedData: any[];
}

function TableCellValue({ getValue, row, column, tabValue, table, updatedData }: TableCellValueProps){
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  },[initialValue]);

  const fieldNameMapping = {
    unitName: 'unitId',
    engagementCategoryName: 'engagementCategoryId',
    engagementCategoryDetailName: 'engagementCategoryDetailId'
  };
  

  const mappedFieldName = fieldNameMapping[column.id] || column.id;


  const isEdited = updatedData.some(
    update => update.engagementId === row.original.engagementId && update.inputName.toLowerCase() === mappedFieldName.toLowerCase()
  );

  const displayValue = column.id === 'date' || column.id === 'period' ? formatDate(value, 'dd LLLL yyyy') : column.id === 'dateIn' 
                                      ? formatDate(value, 'dd LLLL yyyy, HH:mm') : (column.id === 'nominal') ? 
                                      formatNumber(value) : value;

  return <Typography sx={{color: isEdited && tabValue === 1 ? '#41abe1' : 'black', fontSize:'12px'}}>{displayValue}</Typography>
}


function HistoryCell({row}){
  const [diff, setDiff] = useState([{
    fieldName: '',
    previousData: '',
    updatedData: '',
    updatedDate: '',
    userUpdate: ''
  }]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState<any[]>([]);
  const [category, setCategory] = useState<EngagementCategory[]>([]);
  const [categoryDetail, setCategoryDetail] = useState<EngagementCategoryDetail[]>([]);
  const [masterData, setMasterData] = useState<any[]>([]);

  const id = row.original.engagementId;

  const compareJson = () => {
    apiClient.get(`${ApiService.engagement}/updatedData?id=${id}`)
    .then(resp=>resp)
    .then(resp=>setUpdatedData(resp.data));

    apiClient.get(`${ApiService.engagementCategory}`)
    .then(resp=>resp)
    .then(resp=>setCategory(resp.data));

    apiClient.get(`${ApiService.engagementCategoryDetail}`)
    .then(resp=>resp)
    .then(resp=>setCategoryDetail(resp.data));

    apiClient.get(`${ApiService.engagement}/mappingcampus`)
    .then(resp=>resp)
    .then(resp=>setMasterData(resp.data));
  };


  useEffect(() => {
    if (updatedData.length > 0 && masterData.length > 0) {
      const mappedData = updatedData.map((item) => {
        let previousName = item.previousData;
        let updatedName = item.updatedData;

        if(item.inputName.toLowerCase() === "unitid"){
          previousName = masterData.find((master) => master.mappingCampusProgramId === item.previousData)?.programName || previousName;
          updatedName = masterData.find((master) => master.mappingCampusProgramId === item.updatedData)?.programName || updatedName;
        }
        else if (item.inputName.toLowerCase() === 'engagementcategoryid') {
          previousName = category.find((master) => master.engagementCategoryId === Number(item.previousData))?.engagementCategoryName || previousName;
          updatedName = category.find((master) => master.engagementCategoryId === Number(item.updatedData))?.engagementCategoryName || updatedName;
        } 
        else if (item.inputName.toLowerCase() === 'engagementcategorydetailid') {
          previousName = categoryDetail.find((master) => master.engagementCategoryDetailId === Number(item.previousData))?.engagementCategoryDetailName || previousName;
          updatedName = categoryDetail.find((master) => master.engagementCategoryDetailId === Number(item.updatedData))?.engagementCategoryDetailName || updatedName;
        }


        return{
          fieldName: item.fieldName,
          previousData: item.fieldName === 'Period' || item.fieldName === 'Date'? formatHistoryDate(previousName) : item.fieldName === 'Nominal' ? formatNumber(previousName) : previousName,
          updatedData: item.fieldName === 'Period' || item.fieldName === 'Date'? formatHistoryDate(updatedName) : item.fieldName === 'Nominal' ? formatNumber(updatedName) : updatedName,
          updatedDate: String(formatDateTime(item.dateUpdated)),
          userUpdate: item.userUpdate,
        };
      });
      setDiff(mappedData);
      setIsPopupOpen(true);
    }
  }, [updatedData, masterData]);

  return (
    <Stack direction="row">
      <Button onClick={compareJson} name="edit">
        <VisibilityIcon color="primary" />
      </Button>
      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)} maxWidth='lg'>
        <Stack direction='row' sx={{width:'100%', alignItems:'center'}}>
          <DialogTitle>
            <Typography sx={{fontSize:'16px', fontWeight:700}}>
              View Update History
            </Typography>
          </DialogTitle>
          <Box sx={{flexGrow: 1}}/>
          <Button onClick={() => setIsPopupOpen(false)}>
            <CloseIcon color='primary'/>
          </Button>
        </Stack>
        <Divider sx={{marginBottom:'20px'}}/>
        <DialogContent sx={{paddingBottom:'50px'}}>
          <Table sx={{borderLeft: 1, borderTop: 1, borderColor: 'lightgray'}}>
            <TableHead>
              <TableRow>
                <TableCell sx={{borderRight: 1, borderColor: 'lightgray', fontWeight:'bold'}}><Typography sx={{fontSize:'12px', fontWeight:'bold'}}>Field</Typography></TableCell>
                <TableCell sx={{borderRight: 1, borderColor: 'lightgray', fontWeight:'bold'}}><Typography sx={{fontSize:'12px', fontWeight:'bold'}}>Previous Data</Typography></TableCell>
                <TableCell sx={{borderRight: 1, borderColor: 'lightgray', fontWeight:'bold'}}><Typography sx={{fontSize:'12px', fontWeight:'bold'}}>Updated Data</Typography></TableCell>
                <TableCell sx={{borderRight: 1, borderColor: 'lightgray', fontWeight:'bold'}}><Typography sx={{fontSize:'12px', fontWeight:'bold'}}>Updated Date</Typography></TableCell>
                <TableCell sx={{borderRight: 1, borderColor: 'lightgray', fontWeight:'bold'}}><Typography sx={{fontSize:'12px', fontWeight:'bold'}}>Updated By</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diff.length > 0 ? (
                diff.map((data, index) => (
                  <TableRow key={data.fieldName}>
                    <TableCell sx={{borderRight: 1, borderColor: 'lightgray'}}><Typography sx={{fontSize:'12px'}}>{data.fieldName || "-"}</Typography></TableCell>
                    <TableCell sx={{borderRight: 1, borderColor: 'lightgray'}}><Typography sx={{fontSize:'12px'}}>{data.previousData || "-"}</Typography></TableCell>
                    <TableCell sx={{borderRight: 1, borderColor: 'lightgray'}}><Typography sx={{fontSize:'12px'}}>{data.updatedData || "-"}</Typography></TableCell>
                    <TableCell sx={{borderRight: 1, borderColor: 'lightgray'}}><Typography sx={{fontSize:'12px'}}>{data.updatedDate || "-"}</Typography></TableCell>
                    <TableCell sx={{borderRight: 1, borderColor: 'lightgray'}}><Typography sx={{fontSize:'12px'}}>{data.userUpdate || "-"}</Typography></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{borderRight: 1, borderColor: 'lightgray'}}>
                  <Typography sx={{fontSize:'12px'}}>No data available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

interface CheckboxCellProps {
  id: number;
  userIn: string;
  isChecked: boolean;
  handleChange: (id: number, userIn: string, checked: boolean) => void;
}

function CheckboxCell({ id, userIn, isChecked, handleChange }: CheckboxCellProps) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(id, userIn, event.target.checked);
  };

  return <Checkbox checked={isChecked} onChange={onChange} />;
}

const renderCheckboxCell = (
  rowData: ViewApprovalDataType,
  isChecked: boolean,
  handleChange: (id: number, userIn: string, checked: boolean) => void
) => (
  <CheckboxCell
    id={rowData.engagementId}
    userIn={rowData.userIn}
    isChecked={isChecked}
    handleChange={handleChange}
  />
);

export function ApprovalEngagementTable() {
  const userProfile = useSelector(selectProfile);
  const { binusianId, rolePermissions } = userProfile;

  const [updatedData, setUpdatedData] = useState<any[]>([]);
  const [approvalData, setApprovalData] = useState<ViewApprovalDataType[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [, setPartialLoading] = useState(false);
  const [dataWatcher, setDataWatcher] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [selectedEngagement, setSelectedEngagement] = useState<{ id: number; userIn: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [set, reset] = useState(false);
  const [pagination, setPagination] = useState({
		pageIndex: 0, 
		pageSize: 10, 
	});
  const hasPermission = (rolePermissions.some(item => item.permissionName === 'approval-engagement'));
  const renderCellValue = (props: any, updates: any[], tab: any) => (
      <TableCellValue {...props} updatedData={updates} tabValue={tab} />
    )
    const handleCheckboxChange = (id: number, userIn: string, isChecked: boolean) => {
      setSelectedEngagement(prev =>
        isChecked
          ? [...prev, { id, userIn }]
          : prev.filter(item => item.id !== id || item.userIn !== userIn)
      );
    };
  
    const isCheckboxChecked = (id: number, userIn: string): boolean =>
      selectedEngagement.some(item => item.id === id && item.userIn === userIn);
  
  type ColumnType = ColumnDef<ViewApprovalDataType>;
  
  const getColumns = (): ColumnType[] => {
    const columns: ColumnType[] = [
      ...(hasPermission ? [
        {
          accessorKey: 'engagementId',
          header: '',
          size: 1,
  
          cell: props => {
            const rowData = props.row.original;
            return renderCheckboxCell(rowData, isCheckboxChecked(rowData.engagementId, rowData.userIn), handleCheckboxChange);
          },
          enableSorting: false,
        },
      ] : []),
      {
        accessorKey: 'period',
        header: 'Period',
        cell: props => tabValue !== 1 ? formatDate(props.getValue() as string, 'dd LLLL yyyy') : renderCellValue(props, updatedData, tabValue),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: props => tabValue !== 1 ? formatDate(props.getValue() as string, 'dd LLLL yyyy') : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'alumniNIM',
        header: 'NIM',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'alumniName',
        header: 'Name',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'programName',
        header: 'Program',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'unitName',
        header: 'Unit Name',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'engagementCategoryName',
        header: 'Category',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'engagementCategoryDetailName',
        header: 'Category Detail',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'activity',
        header: 'Activity',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell : props => tabValue !== 1 ? props.getValue() : renderCellValue(props, updatedData, tabValue)
      },
      {
        accessorKey: 'nominal',
        header: 'Nominal',
        cell : props => {
          if(tabValue !== 1){
            const rowData = props.row.original;
            return formatNumber(rowData.nominal);
          }
            return renderCellValue(props, updatedData, tabValue)
        }
      },
      {
        accessorKey: 'dateIn',
        header: 'Requested Date',
        cell : props => formatDate(props.getValue() as string, 'dd LLLL yyyy, HH:mm')
      },
      {
        accessorKey: 'userIn',
        header: 'Requested By',
      },
      ...(tabValue === 1 || tabValue === 2 ? [
        {
          accessorKey: 'reason',
          header: 'Reason',
        } as ColumnDef<ViewApprovalDataType>
      ] : []),
      {
        accessorKey: 'approvalStatusName',
        header: 'Status',
      },
      ...(tabValue === 1 ? [
        {
          accessorKey: 'Actions',
          header: 'Update History',
          cell: HistoryCell,
        }
      ] : []),
    ];
    return columns;
  }; 

  const columns = useMemo(() => getColumns(), [selectedEngagement, tabValue]);

  const getViewApproval = useCallback(
    async (query: string, sort?: SortingState, page?: PaginationState) => {
      const param = {
        TabValue: tabValue,
        history: false,
      };
      const url = `${ApiService.engagement}/viewApprovalEngagement?${query}&${qs.stringify(param)}`;
      const response = await apiClient.get(url).then(e => e.data);
      setApprovalData(response.data);
      setTotalResults(response.dataCount);
      if(page){
        setPagination(page);
      }
      if(sort){
        setSorting(sort);
      }
      setTimeout(() => setPartialLoading(false), 1000);
    },[dataWatcher]
  );

  const callUpdatedData = useCallback(
    async() => {
      apiClient.get(`${ApiService.engagement}/updatedData`)
      .then(resp => resp)
      .then(resp => setUpdatedData(resp.data));
    }, []
  );

  useEffect(() => {
    callUpdatedData()
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedEngagement([]);
    setTabValue(newValue);
    setPagination({
      pageIndex:0,
      pageSize:10
    });
    setDataWatcher(!dataWatcher);
    reset(!set);
  };  
  const { showModal } = useModal();

  const handleApprove = () => {
    setIsLoading(true);
    let tempEngagementId: ApproveListType[] = [];
    selectedEngagement.forEach((x) => {
      tempEngagementId.push({
            "engagementId": x.id,
            "request": "Approve",
            "userId": binusianId
        });
    });
    apiClient.post(`${ApiService.engagement}/approve`, tempEngagementId)
    .then(resp => resp)
    .then(resp => {
      if(resp.status === 200){
        showModal({
          title: 'Success',
          message:
            'Request Data Approved Successfully',
          options: {
            variant: 'success',
            onOk:() => {
              setIsLoading(false);
              window.location.reload();
            },
            onClose:() => {
              setIsLoading(false);
              window.location.reload();
            }
          },
        });
      }
    })
    .catch(error_ => {
      showModal({
        title: 'Failed',
        message:
          'Data Approve Failed',
        options: {
          variant: 'failed',
          onOk:() => {
            setIsLoading(false);
          },
          onClose:() => {
            setIsLoading(false);
          }
        },
      });
    })
    setSelectedEngagement([]);
    tempEngagementId = [];
  };

  const serverTable = ServerTableAjax<ViewApprovalDataType>({
    data: approvalData, 
    columns, 
		rowCount: totalResults,
		page: pagination,
		sort: sorting,
		isMultiSort: false,
		onTableChange: getViewApproval,
		pageReset: set,
		search
	});

  const handleSearch =  useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
		const searchTerm = e.target.value.toLowerCase();
		setSearch(searchTerm);
		reset(!set);
  }, 1000);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <PageWrapper>
        <Stack direction='row' gap='10px' sx={{width: '100%'}}>
          <Box sx={{flexGrow: 1}}/>
            <Typography sx={{marginY: '8px', fontSize:'14px', fontWeight:400}}>Search: </Typography>
            <TextField 
              variant="outlined" 
              onChange={(e) => handleSearch(e)}
          />
        </Stack>
        <Box sx={{ width: '100%' }}>
          <Box
              sx={{
                  width: '100%',
                  borderBottom: 3,
                  borderColor: 'primary.main',
                  marginBottom: '-20px',
              }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant='standard'
              TabIndicatorProps={{ style: { display: 'none' } }}
              sx={{
                '& button':{
                    marginRight:'1px',
                    borderTopLeftRadius:'5px',
                    borderTopRightRadius:'5px',
                },
                '& .MuiTab-root': {
                  backgroundColor: 'lightgray',
                  color: 'black',
                },
                '& .Mui-selected': {
                  color: 'white !important', 
                  backgroundColor: 'primary.main', 
                },
                '& .MuiTabs-indicator': {
                  display: 'none', 
                },
              }}
            >
              <Tab
                  label={
                    <Typography sx={{fontSize:'12px', fontWeight:400}}>
                      Add Data
                    </Typography>
                  }
                  sx={{
                      backgroundColor: tabValue !== 0 ? 'lightgray' : 'primary.main',
                  }}
              />
              <Tab
                  label={
                    <Typography sx={{fontSize:'12px', fontWeight:400}}>
                      Edit Data
                    </Typography>
                  }
                  sx={{
                      backgroundColor: tabValue !== 1 ? 'lightgray' : 'primary.main',
                  }}
              />
              <Tab
                  label={
                    <Typography sx={{fontSize:'12px', fontWeight:400}}>
                      Delete Data
                    </Typography>
                  }
                  sx={{
                      backgroundColor: tabValue !== 2 ? 'lightgray' : 'primary.main',
                  }}
              />
          </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Stack direction='column' sx={{ flexGrow: 1, overflow: 'auto', background: 'white', border: '1px solid #CCC', borderRadius: "6px", mb: 2, marginTop:'20px'}}>
              <Box sx={{ position: 'relative' }}>
                {serverTable}
                {hasPermission && (
                  <Typography 
                    sx={{ position: 'absolute', left: 16, bottom: 90, fontSize:'12px', fontWeight:400 }}
                  >
                    {selectedEngagement.length} Row Selected
                  </Typography>
                )}
                {hasPermission && (
                  <Stack direction='row' justifyContent='flex-end'gap='10px' sx={{width:'100%', marginBottom:'20px'}}>
                    <Box sx={{marginRight:'10px'}}>
                      <CustomLoadingButton
                          loading={isLoading}
                          variant="contained"
                          color="secondary"
                          sx={{
                            ...(selectedEngagement.length > 0
                              ? layoutPrivateStyle.modalChangeButton
                              : {
                                  background:
                                  selectedEngagement.length === 0
                                      ? "lightgray"
                                      : "linear-gradient(180deg, rgba(241,135,0,1) 31%, rgba(243,159,51,1) 100%)",
                                  color:
                                  selectedEngagement.length === 0 ? "darkgray" : "white",
                                  width: "120px",
                                  "&:hover": {
                                    background:
                                    selectedEngagement.length === 0
                                        ? "gray"
                                        : "linear-gradient(180deg, rgba(241,135,0,0.8) 31%, rgba(243,159,51,0.8) 100%)",
                                  },
                                }),
                            width: "120px",
                          }}
                          size='medium'
                          onClick={() =>{
                            setOpen(true);
                          }}
                          disabled={selectedEngagement.length === 0}
                      >
                          <Typography sx={{ fontSize: '13px' }}>Send Back</Typography>
                      </CustomLoadingButton>
                      {open &&
                        <SendBackPopUp open={open} handleClose={handleClose} selectedEngagement={selectedEngagement}/>
                      }
                    </Box>
                    <Box sx={{marginRight:'20px'}}>
                      <CustomLoadingButton
                        loading={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                        variant="contained"
                        color="primary"
                        sx={{...layoutPrivateStyle.modalChangeButton, width:'120px'}}
                        size='medium'
                        onClick={() => setOpenModal(true)}
                        disabled={selectedEngagement.length === 0}
                      >
                        <Typography sx={{ fontSize: '13px' }}>Approve</Typography>
                      </CustomLoadingButton>
                      <ModalAlertImport
                        variant="info"
                        title="Approval Confirmation"
                        message='Are you sure want to approve this data?'
                        buttonTitle="Confirm"
                        cancelButton
                        open={openModal}
                        onOk={() => handleApprove()}
                        onClose={() => setOpenModal(false)}
                      />
                    </Box>
                  </Stack>
                )}
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Stack direction='column' sx={{ flexGrow: 1, overflow: 'auto', background: 'white', border: '1px solid #CCC', borderRadius: "6px", mb: 2, marginTop:'20px'}}>
              <Box sx={{ position: 'relative' }}>
                {serverTable}
                {hasPermission && (
                  <Typography 
                    sx={{ position: 'absolute', left: 16, bottom: 90, fontSize:'12px', fontWeight:400 }}
                  >
                    {selectedEngagement.length} Row Selected
                  </Typography>
                )}
                {hasPermission && (
                  <Stack direction='row' justifyContent='flex-end'gap='10px' sx={{width:'100%', marginBottom:'20px'}}>
                    <Box sx={{marginRight:'10px'}}>
                      <CustomLoadingButton
                          loading={isLoading}
                          variant="contained"
                          color="secondary"
                          sx={{
                            ...(selectedEngagement.length > 0
                              ? layoutPrivateStyle.modalChangeButton
                              : {
                                  background:
                                  selectedEngagement.length === 0
                                      ? "lightgray"
                                      : "linear-gradient(180deg, rgba(241,135,0,1) 31%, rgba(243,159,51,1) 100%)",
                                  color:
                                  selectedEngagement.length === 0 ? "darkgray" : "white",
                                  width: "120px",
                                  "&:hover": {
                                    background:
                                    selectedEngagement.length === 0
                                        ? "gray"
                                        : "linear-gradient(180deg, rgba(241,135,0,0.8) 31%, rgba(243,159,51,0.8) 100%)",
                                  },
                                }),
                            width: "120px",
                          }}
                          size='medium'
                          onClick={() =>{
                            setOpen(true);
                          }}
                          disabled={selectedEngagement.length === 0}
                      >
                          <Typography sx={{ fontSize: '13px' }}>Send Back</Typography>
                      </CustomLoadingButton>
                      {open &&
                        <SendBackPopUp open={open} handleClose={handleClose} selectedEngagement={selectedEngagement}/>
                      }
                    </Box>
                    <Box sx={{marginRight:'20px'}}>
                      <CustomLoadingButton
                        loading={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                        variant="contained"
                        color="primary"
                        sx={{...layoutPrivateStyle.modalChangeButton, width:'120px'}}
                        size='medium'
                        onClick={() => setOpenModal(true)}
                        disabled={selectedEngagement.length === 0}
                      >
                        <Typography sx={{ fontSize: '13px' }}>Approve</Typography>
                      </CustomLoadingButton>
                      <ModalAlertImport
                        variant="info"
                        title="Approval Confirmation"
                        message='Are you sure want to approve this data?'
                        buttonTitle="Confirm"
                        cancelButton
                        open={openModal}
                        onOk={() => handleApprove()}
                        onClose={() => setOpenModal(false)}
                      />
                    </Box>
                  </Stack>
                )}
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Stack direction='column' sx={{ flexGrow: 1, overflow: 'auto', background: 'white', border: '1px solid #CCC', borderRadius: "6px", mb: 2, marginTop:'20px'}}>
              <Box sx={{ position: 'relative' }}>
                {serverTable}
                {hasPermission && (
                  <Typography 
                    sx={{ position: 'absolute', left: 16, bottom: 90, fontSize:'12px', fontWeight:400 }}
                  >
                    {selectedEngagement.length} Row Selected
                  </Typography>
                )}
                {hasPermission && (
                  <Stack direction='row' justifyContent='flex-end'gap='10px' sx={{width:'100%', marginBottom:'20px'}}>
                    <Box sx={{marginRight:'10px'}}>
                      <CustomLoadingButton
                          loading={isLoading}
                          variant="contained"
                          color="secondary"
                          sx={{
                            ...(selectedEngagement.length > 0
                              ? layoutPrivateStyle.modalChangeButton
                              : {
                                  background:
                                  selectedEngagement.length === 0
                                      ? "lightgray"
                                      : "linear-gradient(180deg, rgba(241,135,0,1) 31%, rgba(243,159,51,1) 100%)",
                                  color:
                                  selectedEngagement.length === 0 ? "darkgray" : "white",
                                  width: "120px",
                                  "&:hover": {
                                    background:
                                    selectedEngagement.length === 0
                                        ? "gray"
                                        : "linear-gradient(180deg, rgba(241,135,0,0.8) 31%, rgba(243,159,51,0.8) 100%)",
                                  },
                                }),
                            width: "120px",
                          }}
                          size='medium'
                          onClick={() =>{
                            setOpen(true);
                          }}
                          disabled={selectedEngagement.length === 0}
                      >
                          <Typography sx={{ fontSize: '13px' }}>Send Back</Typography>
                      </CustomLoadingButton>
                      {open &&
                        <SendBackPopUp open={open} handleClose={handleClose} selectedEngagement={selectedEngagement}/>
                      }
                    </Box>
                    <Box sx={{marginRight:'20px'}}>
                      <CustomLoadingButton
                        loading={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                        variant="contained"
                        color="primary"
                        sx={{...layoutPrivateStyle.modalChangeButton, width:'120px'}}
                        size='medium'
                        onClick={() => setOpenModal(true)}
                        disabled={selectedEngagement.length === 0}
                      >
                        <Typography sx={{ fontSize: '13px' }}>Approve</Typography>
                      </CustomLoadingButton>
                      <ModalAlertImport
                        variant="info"
                        title="Approval Confirmation"
                        message='Are you sure want to approve this data?'
                        buttonTitle="Confirm"
                        cancelButton
                        open={openModal}
                        onOk={() => handleApprove()}
                        onClose={() => setOpenModal(false)}
                      />
                    </Box>
                  </Stack>
                )}
              </Box>
            </Stack>
          </TabPanel>
        </Box>
    </PageWrapper>
  );
}

ApprovalEngagementTable.propTypes = null;
HistoryCell.propTypes = null;