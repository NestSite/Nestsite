import express, { Request, Response, NextFunction } from 'express'

export interface CustomRequest extends Request {
  merchantId?: string
}
