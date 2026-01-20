import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../ConfirmModal';

describe('ConfirmModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Test Title',
    message: 'Test Message',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when open', () => {
    render(<ConfirmModal {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<ConfirmModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    render(<ConfirmModal {...defaultProps} />);
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when cancel button is clicked', () => {
    render(<ConfirmModal {...defaultProps} />);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should show loading state', () => {
    render(<ConfirmModal {...defaultProps} isLoading={true} />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeDisabled();
  });
});
