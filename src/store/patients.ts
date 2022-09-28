import { Patient } from '@prisma/client';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import config from 'config';
import { parseIds } from 'store/utils';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOING', '/api');

export const getPatients = createAsyncThunk('getPatients', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/patients`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Patient[];
});

const patientsAdapter = createEntityAdapter<Patient>({
  sortComparer: (a, b) => a.lastName.localeCompare(b.lastName),
});

export const patientsSelectors = patientsAdapter.getSelectors();

const patientsSlice = createSlice({
  name: 'patients',
  initialState: patientsAdapter.getInitialState({
    loading: false,
    error: null,
    selectedPatient: null,
  }),
  reducers: {
    selectPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatients.fulfilled, (state, action) => {
      patientsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const { selectPatient } = patientsSlice.actions;

export default patientsSlice;
