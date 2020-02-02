using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Budget.Constants.Enums;
using Budget.Contracts;
using Budget.Contracts.Operation;
using Budget.Dtos.Operation;
using Budget.Models;
using Budget.Models.Repositories;
using Budget.Models.Services;
using Budget.System.Helpers;

namespace Budget.Services
{
    public class OperationService : IOperationService
    {
        private readonly IOperationRepository _operationRepository;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public OperationService(IOperationRepository operationRepository, IMapper mapper, IFileService fileService)
        {
            _fileService = fileService;
            _mapper = mapper;
            _operationRepository = operationRepository;
        }

        public async Task<int> AddAsync(AddOperationRequest request)
        {
            var operation = _mapper.Map<AddOperationRequest, Operation>(request);
            
            if (request.DocumentBase64String != null)
            {
                operation.Document = await _fileService.UploadBase64FileAsync(request.DocumentBase64String, FileTypes.Document);
            }
            
            await _operationRepository.AddAsync(operation);
            return operation.Id;
        }

        public async Task<int> EditAsync(EditOperationRequest request)
        {
            var operation = await _operationRepository.GetAsync(operation => operation.Id == request.Id);
            operation.UserId = request.UserId;
            operation.Date = request.Date;
            operation.Description = request.Description;
            operation.Amount = request.Amount;
            operation.CategoryId = request.CategoryId;
            
            if (request.DocumentBase64String != null)
            {
                operation.Document = await _fileService.UploadBase64FileAsync(request.DocumentBase64String, FileTypes.Document);
            }
            
            await _operationRepository.UpdateAsync(operation);
            return operation.Id;
        }

        public async Task DeleteAsync(DeleteOperationRequest request)
        {
            var operation = await _operationRepository.GetAsync(operation => operation.Id == request.Id);
            if (operation.Document != null) await _fileService.DeleteFile(operation.Document);
            await _operationRepository.DeleteAsync(operation);
        }

        public async Task<OperationDto> GetAsync(GetOperationRequest request)
        {
            var operation = await _operationRepository.GetAsync(operation => operation.Id == request.Id);
            return _mapper.Map<Operation, OperationDto>(operation);
        }

        public async Task DeleteListAsync(DeleteOperationsRequest request)
        {
            foreach (var operationId in request.OperationsIds)
            {
                var operation = await _operationRepository.GetAsync(operation => operation.Id == operationId);
                if (operation.Document != null) await _fileService.DeleteFile(operation.Document);
                await _operationRepository.DeleteAsync(operation);
            }
        }

        public async Task<ListResponse<OperationsListItemDto>> ListAsync(ListOperationsRequest request)
        {
            var paging = ListHelper.FormatPaging(request);
            var sort = ListHelper.FormatSort<Operation>(request);

            var operations = await _operationRepository.GetListAsync(null, sort, paging);
            var operationsCount = await _operationRepository.CountAsync(null);

            return new ListResponse<OperationsListItemDto>
            {
                Result = _mapper.Map<List<Operation>, List<OperationsListItemDto>>(operations),
                Count = operationsCount
            };
        }
    }
}