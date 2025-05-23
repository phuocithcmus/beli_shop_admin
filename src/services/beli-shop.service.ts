import { HttpClient, jsonContentTypeMiddleware } from '@/lib/protocols'
import {
  CreateFeeDto,
  CreatePhaseDto,
  CreateProductDto,
  CreateRevenueDto,
  Fee,
  Phase,
  Product,
  ProductRemainingAmountDto,
  Revenue,
  UpdateRevenueDto,
} from './models/beli-shop.model'

class BeliShopService {
  public static instance: BeliShopService = new BeliShopService()
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient(String(import.meta.env.VITE_API_URL))
    this.httpClient.use(jsonContentTypeMiddleware())
  }

  public async getFees(): Promise<Fee[]> {
    const response = await this.httpClient.get<Fee[]>('/fee')
    return response
  }

  public async getPhase(): Promise<Phase[]> {
    const response = await this.httpClient.get<Phase[]>('/phase')
    return response
  }

  public async getProducts(): Promise<Product[]> {
    const response = await this.httpClient.get<Product[]>('/product')
    return response
  }

  public async getProductsByPhaseId(phaseCode: string): Promise<Product[]> {
    const response = await this.httpClient.get<Product[]>(
      `/product/${phaseCode}`
    )
    return response
  }

  public async getRevenues(): Promise<Revenue[]> {
    const response = await this.httpClient.get<Revenue[]>('/revenue')
    return response
  }

  public async getProductRemaining(): Promise<ProductRemainingAmountDto[]> {
    const response = await this.httpClient.get<ProductRemainingAmountDto[]>(
      '/product/products-remainning'
    )
    return response
  }

  // POST
  public async createPhase(data: CreatePhaseDto): Promise<Phase> {
    const response = await this.httpClient.post<Phase>('/phase', data)
    return response
  }

  public async createFee(data: CreateFeeDto): Promise<Fee> {
    const response = await this.httpClient.post<Fee>('/fee', data)
    return response
  }

  public async createProduct(data: CreateProductDto): Promise<Product> {
    const response = await this.httpClient.post<Product>('/product', data)
    return response
  }

  public async createRevenues(data: CreateRevenueDto): Promise<Revenue> {
    const response = await this.httpClient.post<Revenue>('/revenue', data)
    return response
  }

  //PACTH
  public async updateFee(data: Fee): Promise<Fee> {
    const response = await this.httpClient.patch<Fee>('/fee', { ...data })
    return response
  }

  public async updatePhase(data: Phase): Promise<Phase> {
    const response = await this.httpClient.patch<Phase>('/phase', { ...data })
    return response
  }

  public async updateProduct(data: Product): Promise<Product> {
    const response = await this.httpClient.patch<Product>('/product', {
      ...data,
    })
    return response
  }

  public async updateRevenue(data: UpdateRevenueDto): Promise<Revenue> {
    const response = await this.httpClient.patch<Revenue>('/revenue', {
      ...data,
    })
    return response
  }

  //DELETE
  public async deleteProduct(id: string): Promise<boolean> {
    const response = await this.httpClient.delete<boolean>(`/product/${id}`)
    return response
  }

  public async deleteRevenue(id: string): Promise<boolean> {
    const response = await this.httpClient.delete<boolean>(`/revenue/${id}`)
    return response
  }
}

export { BeliShopService }
