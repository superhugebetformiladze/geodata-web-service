import { useCallback, useEffect, useState } from 'react';
import { fetchGeoObject } from '@api/geoObject/fetchGeoObject';
import { IGeoObject } from '@models/GeoObjectModel';

const useGeoObject = (geoObjectId: number, onError: () => void) => {
  const [geoObject, setGeoObject] = useState<IGeoObject>(null);

  const fetchData = useCallback(async () => {
    try {
      const { data, status } = await fetchGeoObject(geoObjectId);
      if (status === 403) {
        onError();
      }
      else {
        setGeoObject(data);
      }
    } catch (error) {
      console.error('Error setting geo-object:', error);
    }
  }, [onError]);

  useEffect(() => {
    fetchData();
  }, []);

  return geoObject;
};

export default useGeoObject;