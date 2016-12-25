// @flow

import FilmScreening from './FilmScreeningRepository';
import Film from './FilmRepository';
import CinemaHall from './CinemaHallRepository';
import User from './UserRepository';
import FilmScreeningTicket from './FilmScreening/TicketRepository';
import Price from './PriceRepository';
import CapitalTransaction from './CapitalTransactionRepository';

export default {
  Price,
  FilmScreening,
  FilmScreeningTicket,
  Film,
  CinemaHall,
  User,
  CapitalTransaction,
};
