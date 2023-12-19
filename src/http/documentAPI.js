import {$authHost} from "./index";

export const updloadDocument = async (file, description, roles) => {

  if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);
      formData.append('roles', JSON.stringify(roles));
    
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const { data } = await $authHost.post('document/create', formData, config);
      return data;
    }
}

export const updateDocumentInfo = async (id, description, roles) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('description', description);
  formData.append('roles', JSON.stringify(roles));

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const {data} = await $authHost.put('document/update', formData, config)
  return data
}

export const deleteDocument = async (id) => {
  const queryParams = {
    id: id
  };

  const response = await $authHost.delete('document/delete', { params: queryParams });
  return response.status
}


export const getAllDocuments = async (page) => {
  const queryParams = {
    page: 0,
    size: 10
  };

  if (page === 0){
    queryParams.page=page
  } else {
    queryParams.page=page-1
  }

  const {data} = await $authHost.get('document/all', { params: queryParams });
  return data;
}

export const downloadFile = async (id) => {

  const response = await $authHost.get('document/download', {
    responseType: 'blob', // Важно для обработки файла
    params: { id: id }
  });
  // Возвращаем blob для скачивания
  return response.data;
}


