import { useMemo } from "react";
import { useFonosterClient } from "@/common/sdk/hooks/useFonosterClient";
import { useNotification, ErrorType } from "@/common/hooks/useNotification";
import {
  CreateTrunkRequest,
  UpdateTrunkRequest,
  ListTrunksRequest as BaseListTrunksRequest,
  ListTrunksResponse as BaseListTrunksResponse,
  Trunk,
  BaseApiObject
} from "@fonoster/types";
import { Trunks } from "@fonoster/sdk";
import { usePaginatedData } from "@/common/hooks/usePaginatedData";

// Extend the ListTrunksResponse to include prevPageToken
interface ListTrunksResponse extends BaseListTrunksResponse {
  prevPageToken?: string;
  recordTotal?: number;
  filterBy?: Record<string, string>;
}

interface ListTrunksRequest extends BaseListTrunksRequest {
  filterBy?: Record<string, string>;
  pageSize?: number;
}

export const useTrunks = () => {
  const { client, isReady, authentication } = useFonosterClient();
  const { notifyError } = useNotification();

  const _trunks = useMemo(() => {
    if (!client) {
      throw new Error("Fonoster client is not initialized.");
    }
    try {
      return new Trunks(client as any);
    } catch (error) {
      throw new Error("Failed to initialize Trunks client");
    }
  }, [client]);

  // Handle Fake data - make sure all required Trunk properties are non-optional
  const { listItems } = usePaginatedData<Trunk>({
    generateFakeData: (index: number) => ({
      ref: `trunk-${index}`,
      name: `Trunk ${index + 1}`, // This is required to be non-optional
      projectId: `project-${index + 1}`,
      sendRegister: index % 2 === 0,
      inboundUri: `sip:trunk-${index + 1}@sip.fonoster.com`,
      outboundUri: `sip:trunk-${index + 1}@sip.fonoster.com`,
      // Add any other required fields from Trunk type
      createdAt: new Date(Date.now() - (index * 86400000)),
      updatedAt: new Date(Date.now() - (index * 43200000))
    }),
    totalItems: 30,
    defaultPageSize: 10
  });

  const createTrunk = async (
    payload: CreateTrunkRequest
  ): Promise<BaseApiObject | undefined> => {
    try {
      return await authentication.executeWithRefresh(() =>
        _trunks.createTrunk(payload)
      );
    } catch (error: any) {
      notifyError(error as ErrorType);
    }
  };

  const listTrunks = async (
    payload: ListTrunksRequest = {
      pageSize: 10,
      pageToken: undefined
    }
  ): Promise<ListTrunksResponse | undefined> => {
    try {
      return await listItems(payload);

      // if (!isReady) return undefined;
      // return await authentication.executeWithRefresh(() =>
      //   _trunks.listTrunks(payload)
      // );
    } catch (error: any) {
      console.error(error);
      notifyError(error as ErrorType);
    }
  };

  const getTrunk = async (ref: string): Promise<Trunk | undefined> => {
    try {
      return await authentication.executeWithRefresh(() =>
        _trunks.getTrunk(ref)
      );
    } catch (error: any) {
      notifyError(error as ErrorType);
    }
  };

  const deleteTrunk = async (
    ref: string
  ): Promise<BaseApiObject | undefined> => {
    try {
      return await authentication.executeWithRefresh(() =>
        _trunks.deleteTrunk(ref)
      );
    } catch (error: any) {
      notifyError(error as ErrorType);
    }
  };

  const updateTrunk = async (
    data: UpdateTrunkRequest
  ): Promise<BaseApiObject | undefined> => {
    try {
      return await authentication.executeWithRefresh(() =>
        _trunks.updateTrunk(data)
      );
    } catch (error: any) {
      notifyError(error as ErrorType);
    }
  };

  return {
    isReady,
    createTrunk,
    listTrunks,
    updateTrunk,
    getTrunk,
    deleteTrunk
  };
};
