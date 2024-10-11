import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = dateString => {
  return format(new Date(dateString), "d MMMM yyyy 'в' HH:mm", { locale: ru });
};
