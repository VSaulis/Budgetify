using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Contracts;
using Budget.Contracts.Operation;
using Budget.Dtos.Operation;
using Budget.Models;
using Budget.Models.Filters;
using Budget.Models.Repositories;
using Budget.Models.Services;

namespace Budget.Services
{
    public class OperationService : IOperationService
    {
        private readonly IOperationRepository _operationRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public OperationService(IOperationRepository operationRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _operationRepository = operationRepository;
        }

        public async Task<BaseResponse> AddAsync(AddOperationRequest request)
        {
            var operation = _mapper.Map<AddOperationRequest, Operation>(request);
            await _operationRepository.AddAsync(operation);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> EditAsync(EditOperationRequest request)
        {
            var operation = await _operationRepository.GetAsync(operation => operation.Id == request.Id);
            if (operation == null) return new BaseResponse("Operation is not found");

            operation.UserId = request.UserId;
            operation.Date = request.Date;
            operation.Description = request.Description;
            operation.Amount = request.Amount;
            operation.CategoryId = request.CategoryId;

            _operationRepository.Update(operation);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<BaseResponse> DeleteAsync(int id)
        {
            var operation = await _operationRepository.GetAsync(operation => operation.Id == id);
            if (operation == null) return new BaseResponse("Operation is not found");

            _operationRepository.Delete(operation);
            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<ResultResponse<OperationDto>> GetAsync(int id)
        {
            var operation = await _operationRepository.GetAsync(operation => operation.Id == id);
            if (operation == null) return new ResultResponse<OperationDto>("Operation is not found");
            var operationDto = _mapper.Map<Operation, OperationDto>(operation);
            return new ResultResponse<OperationDto>(operationDto);
        }

        public async Task<BaseResponse> DeleteListAsync(DeleteOperationsRequest request)
        {
            foreach (var operationId in request.OperationsIds)
            {
                var operation = await _operationRepository.GetAsync(operation => operation.Id == operationId);
                if (operation == null) return new ResultResponse<OperationDto>("Operation is not found");
                _operationRepository.Delete(operation);
            }

            await _unitOfWork.SaveChangesAsync();
            return new BaseResponse();
        }

        public async Task<ListResponse<OperationsListItemDto>> ListAsync(ListOperationsRequest request)
        {
            var paging = _mapper.Map<ListOperationsRequest, Paging>(request);
            var sort = _mapper.Map<ListOperationsRequest, Sort>(request);
            var filter = _mapper.Map<ListOperationsRequest, OperationsFilter>(request);

            var operations = await _operationRepository.GetListAsync(filter, sort, paging);
            var operationsCount = await _operationRepository.CountAsync(filter);

            var operationsDtosList = _mapper.Map<List<Operation>, List<OperationsListItemDto>>(operations);
            return new ListResponse<OperationsListItemDto>(operationsDtosList, operationsCount);
        }
    }
}